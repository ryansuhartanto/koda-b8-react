FROM caddy:alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY dist /var/www/html
