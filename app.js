
require("dotenv").config();

require("./db");

const express = require("express");
const app = express();

const hbs = require("hbs");

require("./config")(app);
require('./config/session.config')(app)

app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.user = req.session.currentUser
    } else {
        app.locals.user = null
    }
    next()
})

hbs.registerPartials(__dirname + "/views/partials")

hbs.registerHelper('isOwner', function (value, user) {
    return value == user;
});



// Routes
require("./routes")(app)
require("./error-handling")(app);

module.exports = app