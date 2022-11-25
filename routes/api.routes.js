const router = require("express").Router()

const Event = require('../models/Event.model')

router.get("/events", (req, res, next) => {

    Event
        .find()
        .then(event => res.json(event))
        .catch(err => console.log(err))
})

router.get("/:idEvent/details", (req, res, next) => {

    const { idEvent } = req.params

    const { _id } = req.session.currentUser

    Event
        .findById(idEvent)
        .then(event => {
            if (event.owner.valueOf() == _id) {
                req.session.isOwner = true
            }
            res.json(event)
        })
        .catch(err => next(err))
})


module.exports = router