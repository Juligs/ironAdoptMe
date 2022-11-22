const router = require("express").Router();
const Event = require("./../models/event.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const { create } = require("hbs");

router.get("/map", (req, res, next) => {
    Event
        .find()
        .then(foundEvents => {
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
        .create({ title, description, date, address, image: req.file.path })
        .then(() => res.redirect('/event/map'))
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

module.exports = router;


