#!/bin/bash

set -euo pipefail

echo
echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo
echo "Done."
