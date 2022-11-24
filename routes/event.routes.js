const router = require("express").Router();
const Event = require("../models/Event.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const { create } = require("hbs");
const User = require("../models/User.model");
const maps = require("./../services/map-api")
const mapsApi = new maps()

router.get("/map", (req, res, next) => {
    Event
        .find()
        .populate('owner')
        .then(foundEvents => {
            res.render("event/event-list", { foundEvents })
        })
        .catch(err => console.log(err))


})

router.get('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {
    res.render('event/event-create')
})

router.post('/create', isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("image"), (req, res, next) => {

    const { title, description, date, address } = req.body
    const { _id: owner } = req.session.currentUser

    mapsApi
        .geocodeAddress(address)
        .then(({ lat, lng }) => {

            let location = {
                type: 'Point',
                coordinates: [lng, lat]
            }

            return Event.create({ owner, title, description, date, participants: owner, address, location, image: req.file.path })
        })
        .then(() => res.redirect("/event/map"))
        .catch(err => console.log(err))
})

router.post("/:eventID/join", isLoggedIn, async (req, res, next) => {

    const { eventID } = req.params

    Event
        .findByIdAndUpdate(eventID, { $addToSet: { participants: req.session.currentUser._id } })
        .then(() => res.redirect("/event/map"))
        .catch(err => next(err))

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

    let image = req.file ? req.file.path : existingImage

    Event
        .findByIdAndUpdate(idEvent, { title, description, date, address, image }, { new: true })
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

