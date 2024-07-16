FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY src ./src
COPY config ./config
EXPOSE 3100
ENTRYPOINT [ "node", "src/app.js" ]