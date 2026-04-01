ARG VARIANT=24.14-bookworm-slim
FROM node:${VARIANT}

ENV TZ=Asia/Tokyo
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      bash \
      tzdata \
      curl \
      ca-certificates \
      openssh-client \
      git \
      vim \
      fonts-noto-cjk \
 && rm -rf /var/lib/apt/lists/* \
 && npm install -g pnpm \
 && npm install -g playwright \
 && playwright install-deps chromium

 USER node
 