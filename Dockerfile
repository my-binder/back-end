FROM node:16.15-alpine
WORKDIR /usr/src/mybinder
COPY . .
RUN npm install
RUN npm run build