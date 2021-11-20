#!/usr/bin/env bash

if [ -x "$(command -v docker)" ]; then
    echo "Docker already installed"
else
    curl -fsSL https://get.docker.com -o get-docker.sh && \
    sudo sh ./get-docker.sh
fi
docker -v

if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker Compose already installed"
else
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    sudo chmod +x /usr/local/bin/docker-compose
fi
docker-compose -v

docker-compose up -d