<p align="center"><a href="https://github.com/RianTavares/node-crawler" alt="AutoEsporteBot Logo"><img src="https://raw.githubusercontent.com/RianTavares/node-crawler/master/src/images/thumbnail_autoesporte-JS.png?token=AIhXfwE5prYOGa9CzQR5-gxQ9CNVTOvhks5b-3OUwA%3D%3D"></a></p>

<p align="center"><h1 align="center">AutoEsporteBot.js</h1></p>


## What does it do

This bot is a part of a back-end challenge. His main function is catch information from Auto Esporte (https://revistaautoesporte.globo.com/rss/ultimas/feed.xml)
that is a Brazilian TV program and a Brazilian magazine dedicated to the automotive sector and published for Globo. It works as a crawler and catch information of the website above and return in Json format exactly like was requested in the challenge

## Features

- [✓] Easy to use
- [✓] Catches each item and their respective title, link, p, div//ul and div//img
- [✓] Formats the response to Json
- [✓] Test coverage (using JEST)
- [✓] "Dockerized"
- [✓] Implemented as a Webservice for test environments

## Fast setup (CLI Version)

1. Download or Clone the project and extract it
2. Download [Node.js](https://nodejs.org/it/) and install it.
3. Run `npm install` in `node-crawler` folder
4. Start the bot via command line `node ./src/app.js`
5. The project now is running on `3000` port. In the next topic you can see how to login and get a response from the API

#### How to login and run the bot

This project has a database simulated in a js file `/src/models/dbSimulator.js`, because the intention is to do a login validation for a test enviroment and it will just works if there is only single entries into `dbSimulator.js`

1. Download [Postman](https://www.getpostman.com/) and install it
2. With the API running just do a `POST` request with the URL `http://localhost:3000/api/v1/login`
3. Remember to pass username:`root` and password:`123` into the body of this request
4. Copy the request response
5. Open a `GET` request withe the URL `http://localhost:3000/api/v1/info` and choose the tab "Authorization" with the type `Bearer Token`
6. Then paste the request response previously copied in step 4 into "Token" input and send the request

Demo:
<p align="center"><img src="https://raw.githubusercontent.com/RianTavares/node-crawler/master/src/images/video1.gif?token=AIhXf1fqxdqGMSfYkcsgJriCzdnJJWXFks5b-5PtwA%3D%3D"></p>

#### Run the project using container

Dockerfile:
```docker
FROM node:8
WORKDIR /docker/src/app/
COPY package.json /docker/src/app/
RUN npm install
COPY . /docker/src/app/
CMD node ./src/app.js
EXPOSE 3002
```
1. First [Install](https://docs.docker.com/install/) docker and let it [running](https://docs.docker.com/get-started/#test-docker-installation)
2. Into the project folder `node-crawler` run the command `docker build -t node-crawler .`  to create the docker image
3. Then run `docker run -p 3002:3000 node-crawler`
4. run `docker ps` if you want to see the containers started
5. Now  with the API running into the container just do a `POST` request with the URL `http://localhost:3002/api/v1/login`
6. Remember that as configured in Dockerfile the port now is `3002`
7. Don't forget to pass username:`root` and password:`123` into the body of this request
8. Copy the request response
9. Open a `GET` request withe the URL `http://localhost:3000/api/v1/info` and choose the tab "Authorization" with the type `Bearer Token`
10. Then paste the request response previously copied in step 7 into "Token" input and send the request


Demo:
<p align="center"><img src="https://raw.githubusercontent.com/RianTavares/node-crawler/master/src/images/video2.gif?token=AIhXf6TevJyuxawLiUhWxwAXkE6oJR8fks5b-5PuwA%3D%3D"></p>

## Last but not least

#### To run the tests
1. As simple as possible, just run the command `npm test` into the project folder 

#### To run ESlint 
1. Run the command `$ ./node_modules/.bin/eslint yourfile.js`
2. Change `yourfile.js` for the file wanted 
3. exemple: `$ ./node_modules/.bin/eslint ./src/app.js`

#### :)
- if you enjoyed about this project add a star :star: 
- Don't forget to follow me on Instagram [@riantba](https://www.instagram.com/riantba/) :heart:
- And follow me also here on [github](https://github.com/RianTavares) :)


<h1>License</h1>

GNU GENERAL PUBLIC LICENSE

Copyright (c) 2018 Rian Tavares 

