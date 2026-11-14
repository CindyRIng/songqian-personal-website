#!/usr/bin/env bash
# Run any command with the pinned Node 24 toolchain.
#   scripts/with-node.sh pnpm build
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./env.sh
source "$HERE/env.sh"
exec "$@"
