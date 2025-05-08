#!/bin/sh -xe

PROJECT_DIR=/srv/spoties
PROJECT_PARENT="$(dirname $PROJECT_DIR)"
DEPLOY_ID="$(date +%F-%N)"
DEPLOY_DIR="$PROJECT_DIR/$DEPLOY_ID"
export DEBIAN_FRONTEND=noninteractive

# ensure target is writable
sudo chgrp sudo $PROJECT_PARENT
sudo chmod g+w $PROJECT_PARENT
mkdir -p $PROJECT_DIR

# check artefacts exist
if [ ! -d "$PROJECT_DIR/next" ]; then
    echo no artefacts found in $PROJECT_DIR/next. deployment failed
    exit 1
fi

# check deploy_dir does not exist
if [ -d "$DEPLOY_DIR" ]; then
    echo deployment target $DEPLOY_DIR already exists. deployment failed
    exit 1
fi

# install Caddy
if ! command -v /usr/local/go/bin/go &> /dev/null; then
    sudo rm -rf /usr/local/go
    sudo wget https://go.dev/dl/go1.24.3.linux-amd64.tar.gz
    sudo tar -C /usr/local -xzf go1.24.3.linux-amd64.tar.gz
    sudo rm go1.24.3.linux-amd64.tar.gz
    sudo sh -c 'echo export PATH=\$PATH:/usr/local/go/bin >> /etc/profile'
fi

# install Caddy
if ! command -v caddy &> /dev/null; then
    sudo apt install -yq debian-keyring debian-archive-keyring apt-transport-https curl
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
    sudo apt update
    sudo apt install -yq caddy

    # install Cloudflare module
    sudo caddy add-package github.com/caddy-dns/cloudflare
fi

# install Pocketbase
if [ ! -f "/lib/systemd/system/pocketbase.service" ]; then
    sudo cp $PROJECT_DIR/current/deployment/pocketbase.service /lib/systemd/system/
    sudo systemctl enable pocketbase.service
fi

# use Caddy to serve apps
sed -i "s/dns cloudflare .*/dns cloudflare $CLOUDFLARE_DNS_TOKEN/" $PROJECT_DIR/next/deployment/Caddyfile
sudo cp $PROJECT_DIR/next/deployment/Caddyfile /etc/caddy/Caddyfile

# setup pocketbase datadir
sudo mkdir -p $POCKETBASE_DATADIR
sudo chown -Rf debian:debian $POCKETBASE_DATADIR
sed -i "s/serve/serve --dir $POCKETBASE_DATADIR/" $PROJECT_DIR/next/backend/modd.conf

# install new artefacts
mv $PROJECT_DIR/next $DEPLOY_DIR
rm -f $PROJECT_DIR/current && ln -s $DEPLOY_DIR $PROJECT_DIR/current

# restart services
sudo systemctl daemon-reload
sudo systemctl restart pocketbase
sudo systemctl restart caddy

# create or reset Pocketbase admin
$PROJECT_DIR/current/backend/pocketbase superuser upsert $POCKETBASE_ADMIN_EMAIL $POCKETBASE_ADMIN_PASSWORD

# cleanup old deployments
find $PROJECT_DIR -maxdepth 1 -ctime +120 | grep -v "$DEPLOY_ID" | xargs -0 -r rm -rf
