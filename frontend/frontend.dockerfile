FROM node:22.13.0-alpine as base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . /app/

CMD ["npm", "run", "dev"]