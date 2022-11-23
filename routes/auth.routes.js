const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const fileUploader = require('../config/cloudinary.config');
const { isLoggedOut } = require("../middleware/route-guard")
const app = require("../app")



router.get('/signup', (req, res, next) => res.render('auth/signup'))
router.post('/signup', fileUploader.single("image"), (req, res, next) => {

    const { password } = req.body

    console.log(req.body)

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, image: req.file.path, password: hashedPassword }))
        .then(createdUser => res.redirect('/login'))
        .catch(error => next(error))
})

router.get('/login', (req, res, next) => res.render('auth/login'))

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (!bcrypt.compareSync(password, user.password)) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
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