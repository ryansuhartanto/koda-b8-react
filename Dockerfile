FROM caddy:alpine

COPY dist/ /var/www/html
COPY <<EOF /etc/caddy/Caddyfile
:80

root * /var/www/html
encode
file_server
try_files {path} /index.html
EOF
