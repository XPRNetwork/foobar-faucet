# Stage 1 - the build process
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 8080

CMD ["node", "server.js"]