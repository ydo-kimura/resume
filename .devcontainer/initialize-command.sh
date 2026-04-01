#!/bin/bash

set -euo pipefail

if [ ! -f .devcontainer/.env ]; then
  echo "Creating .devcontainer/.env"
  cp .devcontainer/.env.example .devcontainer/.env
fi
