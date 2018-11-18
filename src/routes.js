const api = require("express").Router();
const dataBase = require("./models/dbSimulator");
const jwt = require("./token");
const request = require("request-promise-native");
const cheerio = require("cheerio");
const helpers = require("./functions");
const runningEachItemAndCatchInfo = helpers.methodJsonCreator;
const options = {
  uri:
    "https://revistaautoesporte.globo.com/rss/ultimas/feed.xml?fbclid=IwAR1FCoTiAaXy3k-0pR-AUi5X5mrlVjRWFxkn5oDPfo3F6utkwSwtDiqrH1o",
  transform(body) {
    return cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: true
    });
  }
};

module.exports = () => {
  api.get("/", (req, res) => {
    res.send("OI!");
  });

  /* This is a login validation for a test enviroment and it will just works if
    there is only single entries into dbSimulator */
  api.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userAllowed = dataBase.filter(value => {
      if (value.username === username && value.password === password) {
        res.send(jwt.createSignature(username));
        return true;
      } else {
        return false;
      }
    });
  });

  api.get("/info", (req, res) => {
    const token = req.headers.authorization.split("Bearer ")[1];
    const tokenValid = jwt.verifySignature(token);
    if (tokenValid) {
      // creating a promise to work on the result of URL requested
      request(options)
        .then($ => $("item"))
        .then(item => {
          res.send(runningEachItemAndCatchInfo(item));
        })
        .catch(error => {
          console.log(error);
        });
    }
  });

  return api;
};
