const router = require("express").Router();
const Event = require("./../models/event.model")

router.get("/map", (req, res, next) => res.render("event/event-user"))

router.get('/create', (req, res, next) => {
    res.render('event/create-event')

})
router.post('/create', (req, res, next) => {
    const { title, description, date, address, image } = req.body
    Event
        .createCharacter({ title, description, date, address, image })
        .then(() => res.redirect('/event/map'))
        .catch(err => console.log(err))
})

module.exports = router;


module.exports = router

