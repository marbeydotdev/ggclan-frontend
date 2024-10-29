FROM oven/bun as build
ADD . /app
WORKDIR /app

EXPOSE 3000

RUN bun install
RUN bun run build