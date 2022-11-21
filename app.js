
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

app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.userName = req.session.currentUser.username
    } else {
        app.locals.userName = null
    }
    next()
})

// Routes
require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
