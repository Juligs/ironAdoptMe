const router = require("express").Router()
const Pet = require("./../models/Pet.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/list", isLoggedIn, (req, res, next) => res.render("pets/pets-list"))

router.get("/create", isLoggedIn, checkRoles("SHELTER"), (req, res, next) => res.render("pets/pet-create"))

router.post("/create", isLoggedIn, checkRoles("SHELTER"), fileUploader.single("petImg"), (req, res, next) => {
    const { name, age, breed, description } = req.body

    Pet.create({ name, age, breed, description, petImage: req.file.path })
        .then(() => res.redirect("/pets/list"))
        .catch(err => console.log(err))
})

router.get("/:idPet/edit", isLoggedIn, checkRoles("SHELTER"), (req, res, next) => res.render("pets/pet-edit"))

router.post("/:idPet/delete", (req, res, next) => res.redirect("/"))

module.exports = router