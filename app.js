
require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

const capitalize = require("./utils/capitalize");
const projectName = "ironAdoptMe";

require("./config")(app);

require('./config/session.config')(app)

hbs.registerPartials(__dirname + "/views/partials")

// Routes
require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
