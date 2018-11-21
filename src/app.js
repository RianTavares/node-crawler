/* eslint no-console: ["error", { allow: ["log"] }] */

/*
  FILE DESCRIPTION
  This file is used to configure express,
  setting the port and calling the routes
  acting like a main file.
*/

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const port = process.env.PORT || 3000;

const app = express();
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes());

app.listen(port, () => console.log(`Server running on PORT: ${port}`));
