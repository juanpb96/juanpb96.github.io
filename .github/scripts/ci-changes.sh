#!/usr/bin/env bash
# Decides which CI jobs a change can affect. Used by the `changes` job in
# .github/workflows/ci.yml.
#
# Input:  changed paths on stdin, one per line (relative to the repo root).
# Env:    FULL=true forces every boolean output to true (full-check label or
#         workflow_dispatch; the caller then pipes `git ls-files` so `links`
#         covers every eligible file).
# Output: key=value lines appended to $GITHUB_OUTPUT (stdout when unset).
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

{
  flag code '^(src/|index\.html|public/|scripts/|netlify/|netlify\.toml|vite\.config|tsconfig|package\.json|pnpm-|\.github/)'
  flag ui '^(src/|index\.html|public/|netlify\.toml|vite\.config|package\.json|pnpm-|\.github/)'
  flag deps '^(package\.json|pnpm-)'
  flag workflows '^\.github/'
  flag scripts '^(src/|netlify/|scripts/)'
  echo "links=${links[*]}"
} >>"$out"
