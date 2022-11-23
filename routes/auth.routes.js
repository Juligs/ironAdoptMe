const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const fileUploader = require('../config/cloudinary.config');
const { isLoggedOut } = require("../middleware/route-guard")
const maps = require("./../services/map-api")
const mapsApi = new maps()


router.get('/signup', (req, res, next) => res.render('auth/signup'))
router.post('/signup', fileUploader.single("image"), async (req, res, next) => {

    const { email, password, username, address, phone } = req.body
    const { path: image } = req.file

    const geoCodedAddress = await mapsApi.geocodeAddress(address)

    const { lat, lng } = geoCodedAddress

    let location = {
        type: "Point",
        coordinates: [lng, lat]
    }

    const generatedSalt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, generatedSalt)
    User.create({ email, password: hashedPassword, username, address, location, phone, image })
    res.redirect("/login")
})

router.get('/login', (req, res, next) => res.render('auth/login'))

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email not registered in the Database' })
                return
            } else if (!bcrypt.compareSync(password, user.password)) {
                res.render('auth/login', { errorMessage: 'Password is incorrect' })
                return
            } else {
                req.session.currentUser = user
                if (req.session.currentUser.role === "USER") {
                    req.app.locals.isUser = true
                } else if (req.session.currentUser.role === "SHELTER") {
                    req.app.locals.isShelter = true
                } else {
                    req.app.locals.isAdmin = true
                }
                res.redirect('/pets/list')
            }
        })
        .catch(error => next(error))
})

router.post('/logout', (req, res, next) => {
    req.app.locals.isShelter = false
    req.app.locals.isUser = false
    req.app.locals.isAdmin = false
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router