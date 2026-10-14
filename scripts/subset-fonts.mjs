// Regenerates the self-hosted web fonts in public/fonts/ from the upstream
// variable fonts, subset to the characters the site actually renders.
// Run `pnpm run fonts` after changing copy that introduces new characters.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { parseSync } from "oxc-parser"
import subsetFont from "subset-font"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUTPUT_DIR = path.join(ROOT, "public", "fonts")
const CACHE_DIR = path.join(ROOT, "node_modules", ".cache", "fonts")

// Pinned so regenerating is reproducible. All families are SIL OFL 1.1,
// which allows self-hosting and subsetting; the license ships alongside.
const GOOGLE_FONTS_COMMIT = "23e54b51ddffbc7713c583748e3bd86f62b1fa4a"
const GOOGLE_FONTS_RAW = `https://raw.githubusercontent.com/google/fonts/${GOOGLE_FONTS_COMMIT}/ofl`

// Characters users may type into the contact form, whose fields render in
// Inter: all printable ASCII plus Spanish letters and punctuation.
const PRINTABLE_ASCII = String.fromCharCode(
  ...Array.from({ length: 0x7f - 0x20 }, (_, i) => 0x20 + i),
)
const FORM_INPUT_CHARS = `${PRINTABLE_ASCII}ÁÉÍÓÚÜÑáéíóúüñ¡¿`

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
  {
    output: "jetbrains-mono",
    source: "jetbrainsmono/JetBrainsMono[wght].ttf",
    license: "jetbrainsmono/OFL.txt",
    // Weights used on the site (meta tags, tag pills, dates, tooltips).
    axes: { wght: { min: 400, max: 500 } },
    // Separator in the hero's "caught in review" list; Google's own
    // JetBrains Mono subsets lacked it.
    extraChars: "→",
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

// Drops comments (including JSX {/* */}) so characters that only appear in
// code comments don't end up in the subset. Uses a real parser, so "//" or
// "/*" inside strings or JSX text (URLs, copy) is kept as visible text.
function stripComments(code, file) {
  const { comments, errors } = parseSync(file, code)

  if (errors.length > 0) {
    throw new Error(`Failed to parse ${file}: ${errors[0].message}`)
  }

  let result = ""
  let last = 0

  for (const { start, end } of comments) {
    result += code.slice(last, start)
    last = end
  }

  return result + code.slice(last)
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
    const code = stripComments(await readFile(file, "utf8"), file)

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
