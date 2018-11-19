FROM node:8
WORKDIR /docker/src/app/
COPY package.json /docker/src/app/
RUN npm install
COPY . /docker/src/app/
CMD node ./src/app.js
EXPOSE 3002