const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/list", isLoggedIn, (req, res) => {

    if (req.session.currentUser.role === "USER") {
        req.app.locals.isUser = true
        User
            .find({ role: "SHELTER" })
            .then(users => res.render("users/list-user", { users }))
            .catch(err => console.log(err))
    } else if (req.session.currentUser.role === "SHELTER") {
        req.app.locals.isShelter = true
        User
            .find()
            .then(users => {
                res.render('users/list-user', { users })
            })
            .catch(err => console.log(err))
    } else {
        req.app.locals.isAdmin = true
        User
            .find()
            .then(users => {
                res.render('users/list-user', { users })
            })
            .catch(err => console.log(err))
    }

})

router.get('/:user_id/profile', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/profile-user', {
                user,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isOwner: req.session.currentUser._id === user_id,
            })
        })
        .catch(err => console.log(err))
})


router.get('/:user_id/edit', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/edit-user', {
                user,
                isAdmin: req.session.currentUser.role === 'ADMIN',

            })
        })
        .catch(err => console.log(err))
})

router.post('/:user_id/edit', (req, res) => {
    const { username, image, role, phone, address } = req.body
    console.log(req.body)

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, image, role, phone, address })
        .then(() => res.redirect(`/user/profile/${user_id}`))
        .catch(err => console.log(err))
})

router.post('/:user_ide/delete', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect("/user/list"))
        .catch(err => console.log(err))

})

module.exports = router