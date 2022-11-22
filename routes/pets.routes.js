const router = require("express").Router()
const Pet = require("./../models/Pet.model")
const User = require("./../models/User.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const { create } = require("hbs");
let petCreated;
router.get("/list", isLoggedIn, (req, res, next) => {

    Pet
        .find()
        .then(pets => res.render("pets/pets-list", { pets }))
        .catch(err => console.log(err))
})

router.get("/create", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => res.render("pets/pet-create"))

router.post("/create", isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("petImg"), (req, res, next) => {

    const { name, age, breed, description } = req.body

    Pet.create({ name, age, breed, description, image: req.file.path, shelterBy: req.session.currentUser._id })
        .then(createdPet => User.findByIdAndUpdate(req.session.currentUser._id, { $push: { pets: createdPet._id } }))
        .then(res.redirect("/pets/list"))
        .catch(err => console.log(err))
})
router.get("/:idPet/profile", (req, res, next) => {

    const { idPet } = req.params

    Pet
        .findById(idPet)
        .then(pet => res.render("pets/profile-pet", { pet }))
        .catch(err => console.log(err))
})

router.get("/:idPet/edit", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {

    const { idPet } = req.params

    Pet
        .findById(idPet)
        .then(pet => res.render("pets/pet-edit", { pet }))
        .catch(err => console.log(err))
})

router.post("/:idPet/edit", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {

    const { idPet } = req.params
    console.log("Este es el id", idPet)
    const { name, age, breed, description, status, image } = req.body
    console.log("Este es el req body", name, age, breed, description, status, image)

    Pet
        .findByIdAndUpdate(idPet, { name, age, breed, description, status, image })
        .then((pet) => res.redirect(`/pets/${pet._id}/profile`))
        .catch(err => console.log(err))

})

router.post("/:idPet/delete", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => {

    const { idPet } = req.params

    Pet
        .findByIdAndDelete(idPet)
        .then(() => res.redirect("/pets/list"))
        .catch(err => console.log(err))
})

module.exports = router