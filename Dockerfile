FROM node:14.16.1

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN yarn add ts-node-dev --dev
RUN yarn install


EXPOSE 3333