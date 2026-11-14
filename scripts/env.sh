#!/usr/bin/env bash
# Pin Node 24 (Astro 7 requires >=22.23.4; the system default here is 22.23.2).
# Usage:  source scripts/env.sh   then   pnpm dev / pnpm build ...
# Or:     scripts/with-node.sh pnpm build
export SITE_NODE_HOME="/nix/store/lfaydgacdyngci7p60s8wwvgdm74fjkx-nodejs-24.19.0"
case ":$PATH:" in
  *":$SITE_NODE_HOME/bin:"*) ;;
  *) export PATH="$SITE_NODE_HOME/bin:$PATH" ;;
esac
