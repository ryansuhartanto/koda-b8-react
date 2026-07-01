FROM alpine/git:latest AS src

WORKDIR /var/src
RUN git clone --filter=blob:none https://github.com/ryansuhartanto/koda-b8-react.git .

FROM oven/bun:alpine AS build

WORKDIR /var/build
COPY --from=src /var/src .
RUN bun install --frozen-lockfile --ignore-scripts
RUN bun run build

FROM caddy:alpine

WORKDIR /var/www/html
COPY --from=build /var/build/dist .

COPY <<EOF /etc/caddy/Caddyfile
:80

root * /var/www/html
encode gzip zstd
file_server
try_files {path} /index.html
EOF
