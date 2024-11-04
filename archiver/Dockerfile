
FROM node:20

WORKDIR /
COPY package.json bun.lockb ./
RUN npm install -g bun
RUN bun install

COPY . .

EXPOSE 3003

CMD [ "bun", "run", "index.ts" ]
