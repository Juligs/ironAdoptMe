const router = require("express").Router();
const Event = require("./../models/Event.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const { create } = require("hbs");
const User = require("../models/User.model");

router.get("/map", (req, res, next) => {
    Event
        .find()
        .then(foundEvents => {
            console.log(foundEvents[0])
            res.render("event/event-user", { foundEvents })
        })
        .catch(err => console.log(err))


})
router.get('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {
    res.render('event/create-event')

})
router.post('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("image"), (req, res, next) => {
    const { title, description, date, address } = req.body

    Event
        .create({ owner: req.session.currentUser._id, title, description, date, address, image: req.file.path })
        .then(() => res.redirect('/event/map'))
        .catch(err => console.log(err))
})

router.post("/:eventID/join", isLoggedIn, (req, res, next) => {

    const { eventID } = req.params

    Event
        .findByIdAndUpdate(eventID, { $push: { participants: req.session.currentUser._id } })
        .then(() => res.redirect("/event/map"))
        .catch(err => console.log(err))


})


module.exports = router;


