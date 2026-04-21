#!/bin/sh
set -eu

escape_js_string() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\$/\\$/g'
}

mkdir -p /usr/share/nginx/html

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__RUNTIME_CONFIG__ = {
  VITE_GEMINI_API_KEY: "$(escape_js_string "${VITE_GEMINI_API_KEY:-}")",
  VITE_GEMINI_MODEL_CANDIDATES: "$(escape_js_string "${VITE_GEMINI_MODEL_CANDIDATES:-}")"
};
EOF