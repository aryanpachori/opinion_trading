
FROM node:20

WORKDIR /
COPY package.json bun.lockb ./
RUN npm install -g bun
RUN bun install

COPY . .



CMD [ "bun", "run", "index.ts" ]
