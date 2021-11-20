FROM node
WORKDIR /app

COPY public public/
COPY src src/

COPY package.json .
COPY tsconfig.json .

RUN npm config set strict-ssl false && npm install
ENTRYPOINT ["npm","run","start"]