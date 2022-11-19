const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const { isLoggedOut } = require("../middleware/route.guard")
const app = require("../app")

// Signup
router.get('/registro', isLoggedOut, (req, res, next) => res.render('auth/signup'))
router.post('/registro', isLoggedOut, (req, res, next) => {

    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})

router.get('/iniciar-sesion', isLoggedOut, (req, res, next) => res.render('auth/login'))

router.post('/iniciar-sesion', isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (!bcrypt.compareSync(userPwd, user.password)) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                if (req.session.currentUser.role == "USER") req.app.locals.isUser = true
                if (req.session.currentUser.role == "SHELTER") req.app.locals.isShelter = true
                if (req.session.currentUser.role == "ADMIN") req.app.locals.isAdmin = true
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

router.post('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router