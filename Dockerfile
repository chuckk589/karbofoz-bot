FROM node:slim as pptr

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

FROM pptr as base
COPY . .
RUN apt-get update && apt install bash python3 make g++ yarn -y
WORKDIR /app
COPY package.json tsconfig.json yarn.lock  ./
RUN yarn --frozen-lockfile

FROM base as vue
COPY . .
WORKDIR /app/vue
RUN yarn

FROM vue as builder
WORKDIR /app
COPY . .
RUN yarn run build

