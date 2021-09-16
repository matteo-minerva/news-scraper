const express = require("express");
const app = express();

require("./logging")();
require("./routes")(app);
require("./config")();

module.exports = app;
