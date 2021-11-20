#!/usr/bin/env bash

if [ -x "$(command -v docker)" ]; then
    echo "Docker already installed"
    docker -v
else
    curl -fsSL https://get.docker.com -o get-docker.sh && \
    sudo DRY_RUN=1 sh ./get-docker.sh
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker Compose already installed"
    docker-compose -v
else
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

docker-compose up -d