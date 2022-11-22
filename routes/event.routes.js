const router = require("express").Router();
const Event = require("../models/Event.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const { create } = require("hbs");
const User = require("../models/User.model");

router.get("/map", (req, res, next) => {
    Event
        .find()
        .populate("owner")
        .then(foundEvents => {
            res.render("event/event-list", { foundEvents })
        })
        .catch(err => console.log(err))


})
router.get('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {
    res.render('event/event-create')

})
router.post('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("image"), (req, res, next) => {
    console.log(req.body)
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

router.get("/:idEvent/edit", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {

    const { idEvent } = req.params

    Event
        .findById(idEvent)
        .then(event => res.render("event/edit-event", { event }))
        .catch(err => console.log(err))
})

router.post("/:idEvent/edit", isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("image"), (req, res, next) => {

    const { idEvent } = req.params
    const { title, description, date, address, existingImage } = req.body

    let imgUrl

    if (req.file) {
        imgUrl = req.file.path
    } else {
        imgUrl = existingImage
    }

    Event
        .findByIdAndUpdate(idEvent, { title, description, date, address, image: imgUrl }, { new: true })
        .then(() => res.redirect(`/event/map`))
        .catch(err => console.log(err))

})

router.post("/:idEvent/delete", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {

    const { idEvent } = req.params

    Event
        .findByIdAndDelete(idEvent)
        .then(() => res.redirect("/event/map"))
        .catch(err => console.log(err))
})

module.exports = router

