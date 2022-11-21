const router = require("express").Router();
const Event = require("./../models/event.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const { create } = require("hbs");

router.get("/map", (req, res, next) => res.render("event/event-user"))

router.get('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {
    res.render('event/create-event')

})
router.post('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {
    const { title, description, date, address, image } = req.body
    Event
        .create({ title, description, date, address, image })
        .then(() => res.redirect('/event/map'))
        .catch(err => console.log(err))
})

module.exports = router;


