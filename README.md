
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
4. Start the bot via command line `node app.js` in `/src/` folder
5. The project now is running on `3000` port. In the next topic you can see how to login and get a response from the API

#### How to login and run the bot

This project has a database simulated in a js file `/src/models/dbSimulator.js`, because the intention is to do a login validation for a test enviroment and it will just works if there is only single entries into `dbSimulator.js`

1. Download [Postman](https://www.getpostman.com/) and install it
2. With the API running just do a `POST` request with the URL `http://localhost:3000/api/v1/login`
3. Copy the request response
4. Open a `GET` request and choose the tab "Authorization" with the type `Bearer Token`
5. Then paste the request response previously copied in step 3 into "Token" input and send de request

