// Regenerates the self-hosted web fonts in public/fonts/ from the upstream
// variable fonts, subset to the characters the site actually renders.
// Run `pnpm run fonts` after changing copy that introduces new characters.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import subsetFont from "subset-font"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUTPUT_DIR = path.join(ROOT, "public", "fonts")
const CACHE_DIR = path.join(ROOT, "node_modules", ".cache", "fonts")

// Pinned so regenerating is reproducible. Both families are SIL OFL 1.1,
// which allows self-hosting and subsetting; the license ships alongside.
const GOOGLE_FONTS_COMMIT = "23e54b51ddffbc7713c583748e3bd86f62b1fa4a"
const GOOGLE_FONTS_RAW = `https://raw.githubusercontent.com/google/fonts/${GOOGLE_FONTS_COMMIT}/ofl`

// Characters users may type into the contact form, whose fields render in
// Inter: all printable ASCII plus Spanish letters and punctuation.
const PRINTABLE_ASCII = String.fromCharCode(
  ...Array.from({ length: 0x7f - 0x20 }, (_, i) => 0x20 + i),
)
const FORM_INPUT_CHARS = `${PRINTABLE_ASCII}ÁÉÍÓÚÜÑáéíóúüñ¡¿`

// Glyphs the site renders from a system font today (outside the Google
// Fonts "latin" subset the site used to load); kept out so they don't
// silently switch to the web font's design.
const EXCLUDED_CHARS = "✓"

const FONTS = [
  {
    output: "instrument-sans",
    source: "instrumentsans/InstrumentSans[wdth,wght].ttf",
    license: "instrumentsans/OFL.txt",
    // Weights used on the site; width pinned to its default (normal).
    axes: { wght: { min: 400, max: 700 }, wdth: 100 },
    extraChars: "",
  },
  {
    output: "inter",
    source: "inter/Inter[opsz,wght].ttf",
    license: "inter/OFL.txt",
    // Weights used on the site; optical size pinned to 14, the default
    // Google Fonts served, so glyph shapes stay as they were.
    axes: { wght: { min: 400, max: 500 }, opsz: 14 },
    extraChars: FORM_INPUT_CHARS,
  },
]

async function download(file) {
  const cached = path.join(CACHE_DIR, GOOGLE_FONTS_COMMIT, file)

  try {
    return await readFile(cached)
  } catch {
    const response = await fetch(`${GOOGLE_FONTS_RAW}/${file}`)

    if (!response.ok) {
      throw new Error(`Failed to download ${file}: ${response.status}`)
    }

    const data = Buffer.from(await response.arrayBuffer())

    await mkdir(path.dirname(cached), { recursive: true })
    await writeFile(cached, data)

    return data
  }
}

// Drops // and /* */ comments (including JSX {/* */}) so characters that
// only appear in code comments don't end up in the subset. Strings end at
// a newline, which also contains stray apostrophes in JSX text.
function stripComments(code) {
  let result = ""
  let quote = null

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const next = code[i + 1]

    if (quote) {
      result += char

      if (char === "\\") {
        result += next ?? ""
        i++
      } else if (char === quote || (char === "\n" && quote !== "`")) {
        quote = null
      }
    } else if (char === "/" && next === "/") {
      while (i < code.length && code[i] !== "\n") i++
      result += "\n"
    } else if (char === "/" && next === "*") {
      const end = code.indexOf("*/", i + 2)
      i = end === -1 ? code.length : end + 1
    } else {
      if (char === '"' || char === "'" || char === "`") quote = char
      result += char
    }
  }

  return result
}

async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })

  return entries
    .filter((entry) => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))
}

async function collectSiteChars() {
  const files = await collectSourceFiles(path.join(ROOT, "src"))
  const chars = new Set()

  for (const file of files) {
    const code = stripComments(await readFile(file, "utf8"))

    for (const char of code) {
      if (char.codePointAt(0) >= 0x20) chars.add(char)
    }
  }

  return chars
}

const siteChars = await collectSiteChars()

await mkdir(OUTPUT_DIR, { recursive: true })

for (const font of FONTS) {
  const chars = new Set([...siteChars, ...font.extraChars])

  for (const char of EXCLUDED_CHARS) chars.delete(char)

  const text = [...chars].sort().join("")

  const woff2 = await subsetFont(await download(font.source), text, {
    targetFormat: "woff2",
    variationAxes: font.axes,
  })

  await writeFile(path.join(OUTPUT_DIR, `${font.output}.woff2`), woff2)
  await writeFile(
    path.join(OUTPUT_DIR, `${font.output}-OFL.txt`),
    await download(font.license),
  )

  const nonAscii = [...chars].filter((char) => char.codePointAt(0) > 0x7e)

  console.log(
    `${font.output}.woff2: ${(woff2.length / 1024).toFixed(1)} KB, ` +
      `${chars.size} chars (non-ASCII: ${nonAscii.join(" ")})`,
  )
}
