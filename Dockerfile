# build step

FROM node:16.15-alpine as build
WORKDIR  /usr/src/mybinder
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

# run step

FROM node:16.15-alpine
WORKDIR /usr/src/mybinder
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm install --only=production --ignore-scripts
COPY --from=build /usr/src/mybinder/dist ./dist