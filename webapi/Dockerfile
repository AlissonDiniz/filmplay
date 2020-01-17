FROM node:12
LABEL Description="FilmPlay WebApi"
MAINTAINER Alisson Narjario Queiroga Diniz

COPY dist ./
COPY .env ./
COPY package*.json ./

RUN npm install

CMD [ "node", "./dist/index.js" ]
