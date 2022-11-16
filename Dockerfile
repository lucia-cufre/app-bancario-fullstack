FROM node:16-alpine as BUILDER 
LABEL maintainer="Lucia Cufre"

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]