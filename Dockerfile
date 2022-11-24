# build step

FROM node:16.15 as build
WORKDIR  /usr/src/mybinder
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

# run step

FROM node:16.15
WORKDIR /usr/src/mybinder
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm install --only=production --ignore-scripts
COPY --from=build /usr/src/mybinder/dist ./dist