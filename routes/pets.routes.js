const router = require("express").Router()
const Pet = require("./../models/Pet.model")
const User = require("./../models/User.model")
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard');
const maps = require("./../services/map-api")
const mapsApi = new maps()

router.get("/list", isLoggedIn, (req, res, next) => {

    Pet
        .find()
        .then(pets => res.render("pets/pets-list", { pets }))
        .catch(err => console.log(err))
})

router.get("/create", isLoggedIn, checkRoles("SHELTER", "ADMIN"), (req, res, next) => res.render("pets/pet-create"))

router.post("/create", isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("petImg"), (req, res, next) => {

    const { name, age, breed, description, species } = req.body
    const { path: image } = req.file
    const { _id: shelterBy } = req.session.currentUser
    const { location } = req.session.currentUser

    Pet
        .create({ name, age, breed, location, species, description, image, shelterBy })
        .then(createdPet => User.findByIdAndUpdate(shelterBy, { $push: { pets: createdPet._id } }))
        .then(() => res.redirect("/pets/list"))
        .catch(err => console.log(err))
})

router.get("/:idPet/profile", (req, res, next) => {

    const { idPet } = req.params
    Pet
        .findById(idPet)
        .then(pet => res.render("pets/profile-pet", {
            pet,
            isOwner: req.session.currentUser._id === pet.shelterBy.valueOf()
        }))
        .catch(err => console.log(err))
})

router.get("/:idPet/edit", isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("image"), (req, res, next) => {

    const { idPet } = req.params

    Pet
        .findById(idPet)
        .then(pet => res.render("pets/pet-edit", { pet }))
        .catch(err => console.log(err))
})

router.post("/:idPet/edit", isLoggedIn, checkRoles("SHELTER", "ADMIN"), fileUploader.single("image"), (req, res, next) => {

    const { idPet } = req.params
    const { name, age, breed, description, status, existingImage } = req.body

    let image = req.file ? req.file.path : existingImage

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

router.get("/filter", isLoggedIn, async (req, res, next) => {

    const { age, breed, species, address } = req.query
    const query = {}


    if (age) query.age = age
    if (breed) query.breed = breed
    if (species) query.species = species
    if (address) {
        const geoCodedAddress = await mapsApi.geocodeAddress(address)
        const { lat, lng } = geoCodedAddress
        query.location = {
            $near: {
                $maxDistance: 20000,
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    }



    Pet
        .find(query)
        .then(pets => res.render("pets/pets-list", { pets }))
        .catch(err => next(err))


})
router.post("/:idPet/like", isLoggedIn, async (req, res, next) => {

    const { age, breed, species, address } = req.query
    const query = {}


    if (age) query.age = age
    if (breed) query.breed = breed
    if (species) query.species = species
    if (address) {
        const geoCodedAddress = await mapsApi.geocodeAddress(address)
        const { lat, lng } = geoCodedAddress
        query.location = {
            $near: {
                $maxDistance: 20000,
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    }



    Pet
        .find(query)
        .then(pets => res.render("pets/pets-list", { pets }))
        .catch(err => next(err))


})


module.exports = router