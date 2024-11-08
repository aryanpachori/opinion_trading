
FROM node:20

WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install -g bun
RUN bun install

COPY . .
RUN bunx prisma generate
EXPOSE 3002

CMD [ "bun", "run", "index.ts" ]
