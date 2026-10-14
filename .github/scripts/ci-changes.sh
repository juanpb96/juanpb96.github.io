#!/usr/bin/env bash
# Decides which CI jobs a change can affect. Used by the `changes` job in
# .github/workflows/ci.yml.
#
# Input:  changed paths on stdin, one per line (relative to the repo root).
# Env:    FULL=true forces every boolean output to true (full-check label or
#         workflow_dispatch; the caller then pipes `git ls-files` so `links`
#         covers every eligible file).
# Output: key=value lines appended to $GITHUB_OUTPUT (stdout when unset).
#         `e2e` is a Playwright --grep pattern such as "@nav|@contact", or
#         empty when no section can be affected.
#
# Run from the repository root: `links` only keeps files that still exist.
set -euo pipefail

out="${GITHUB_OUTPUT:-/dev/stdout}"
full="${FULL:-false}"

files=()
while IFS= read -r line; do
  [ -n "$line" ] && files+=("$line")
done

# True when any changed path matches the extended regex in $1.
matches() {
  [ "$full" = true ] && return 0
  [ "${#files[@]}" -gt 0 ] || return 1
  printf '%s\n' "${files[@]}" | grep -qE "$1"
}

flag() {
  if matches "$2"; then echo "$1=true"; else echo "$1=false"; fi
}

# Files Lychee should scan. Paths are passed through an `eval` inside
# lychee-action, so only plain path characters are allowed; anything else
# is dropped rather than quoted. Test files hold fixture URLs, not links.
links=()
for f in "${files[@]}"; do
  [[ "$f" =~ (\.md$|^src/data/|^src/components/|^index\.html$) ]] || continue
  [[ "$f" =~ \.test\.[jt]sx?$ ]] && continue
  [[ "$f" =~ ^[A-Za-z0-9._/@+-]+$ ]] || {
    echo "::warning::Skipping link check for unusual path: ${f//[^A-Za-z0-9._\/ -]/?}" >&2
    continue
  }
  [ -f "$f" ] && links+=("$f")
done

# Playwright tags (e2e/<section>.spec.ts) for the sections a change can
# affect. A change only one section can see runs that section's tag; anything
# shared (layout, tokens, global CSS, the HTML shell, deps, CI) runs them all.
sections=(nav hero projects experience contact footer)
e2e_tags=()
e2e_all="$full"
add_tag() {
  local t
  for t in "${e2e_tags[@]}"; do [ "$t" = "$1" ] && return; done
  e2e_tags+=("$1")
}
for f in "${files[@]}"; do
  case "$f" in
    *.test.ts | *.test.tsx | src/test/*) ;;
    src/components/nav/* | e2e/nav.spec.ts*) add_tag nav ;;
    src/components/hero/* | e2e/hero.spec.ts*) add_tag hero ;;
    src/components/projects/* | src/data/projects.ts | e2e/projects.spec.ts*) add_tag projects ;;
    src/components/experience/* | src/data/experiences.ts | e2e/experience.spec.ts*) add_tag experience ;;
    src/components/contact/* | e2e/contact.spec.ts*) add_tag contact ;;
    src/components/footer/* | e2e/footer.spec.ts*) add_tag footer ;;
    src/* | index.html | public/* | e2e/* | playwright.config.ts | vite.config.ts | package.json | pnpm-* | .github/*)
      e2e_all=true
      ;;
  esac
done
[ "$e2e_all" = true ] && e2e_tags=("${sections[@]}")
e2e=""
for t in "${e2e_tags[@]}"; do e2e="${e2e:+$e2e|}@$t"; done

{
  flag code '^(src/|e2e/|index\.html|public/|scripts/|netlify/|netlify\.toml|vite\.config|playwright\.config|tsconfig|package\.json|pnpm-|\.github/)'
  flag ui '^(src/|index\.html|public/|netlify\.toml|vite\.config|package\.json|pnpm-|\.github/)'
  flag deps '^(package\.json|pnpm-)'
  flag workflows '^\.github/'
  flag scripts '^(src/|netlify/|scripts/)'
  echo "links=${links[*]}"
  echo "e2e=$e2e"
} >>"$out"
