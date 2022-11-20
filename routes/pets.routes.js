const router = require("express").Router()
const Pet = require("./../models/Pet.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/list", isLoggedIn, (req, res, next) => {

    Pet
        .find()
        .then(pets => res.render("pets/pets-list", { pets }))
        .catch(err => console.log(err))
})

router.get("/create", isLoggedIn, checkRoles("SHELTER"), (req, res, next) => res.render("pets/pet-create"))

router.post("/create", isLoggedIn, checkRoles("SHELTER"), fileUploader.single("petImg"), (req, res, next) => {

    const { name, age, breed, description } = req.body

    Pet.create({ name, age, breed, description, petImage: req.file.path, shelterBy: req.session.currentUser._id })
        .then(() => res.redirect("/pets/list"))
        .catch(err => console.log(err))
})
router.get("/:idPet/profile", (req, res, next) => {

    const { idPet } = req.params

    Pet
        .findById(idPet)
        .then(pet => res.render("pets/profile-pet", { pet }))
        .catch(err => console.log(err))
})

router.get("/:idPet/edit", isLoggedIn, checkRoles("SHELTER"), (req, res, next) => {

    const { idPet } = req.params

    Pet
        .findById(idPet)
        .then(pet => res.render("pets/pet-edit", { pet }))
        .catch(err => console.log(err))
})

router.post("/:idPet/edit", isLoggedIn, (req, res, next) => {

    const idPet = req.params
    const { name, age, breed, description } = req.body

    Pet
        .findByIdAndUpdate(idPet, { name, age, breed, description })
        .then(() => res.redirect("/pets/list"))
        .catch(err => console.log(err))

})

router.post("/:idPet/delete", (req, res, next) => {

    const idPet = req.params

    Pet
        .findByIdAndDelete(idPet)
        .then(() => res.redirect("/pets/list"))
        .catch(err => console.log(err))
})

module.exports = router