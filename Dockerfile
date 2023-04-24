FROM node:16-alpine as base
RUN apk update && apk add bash git python3 make g++ yarn>=1.22.4
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
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

