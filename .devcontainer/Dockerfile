ARG VARIANT="24-bookworm"
FROM mcr.microsoft.com/devcontainers/typescript-node:${VARIANT}

ARG TZ
ENV TZ=${TZ}

RUN apt-get update \
 && apt-get install -y --no-install-recommends fonts-noto-cjk \
 && rm -rf /var/lib/apt/lists/*

# Playwright はグローバル導入し、OS 依存ライブラリは root で入れる
RUN npm install -g playwright \
 && playwright install-deps chromium

# ブラウザ本体は node ユーザーのキャッシュに入れる
USER node
RUN playwright install chromium
