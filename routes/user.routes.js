const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/list", isLoggedIn, (req, res) => {

    if (req.session.currentUser.role === "USER") {
        User
            .find({ role: "SHELTER" })
            .then(shelters => res.render("users/list-user", { shelters }))
            .catch(err => console.log(err))
    }

    User
        .find()
        .then(user => {
            res.render('users/list-user', { user })
        })
        .catch(err => console.log(err))
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
    const { username, profileImg, role, phone, address } = req.body
    console.log(req.body)

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, profileImg, role, phone, address })
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