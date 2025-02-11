const express = require("express");
const app = express();

app.use(`/obs`, require("./obs.route"));

module.exports = app;
