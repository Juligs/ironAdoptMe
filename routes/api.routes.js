const router = require("express").Router()

const Event = require('../models/Event.model')

router.get("/events", (req, res, next) => {

    Event
        .find()
        .select({ location: 1 })
        .then(event => res.json(event))
        .catch(err => console.log(err))
})

module.exports = router