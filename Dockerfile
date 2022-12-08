FROM node:16.15-alpine
WORKDIR /usr/src/mybinder
COPY . /usr/src/mybinder
RUN npm install
RUN npm run build