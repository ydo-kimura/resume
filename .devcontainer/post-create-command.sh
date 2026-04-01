#!/bin/bash

set -euo pipefail

echo
echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo
echo "Installing Playwright Chromium (skipped in image build for Alpine reliability)..."
pnpm exec playwright install chromium

echo
echo "Done."
