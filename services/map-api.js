const axios = require("axios")

class mapService {

    constructor() {
        this.axios = axios.create()
    }

    geocodeAddress = (address) => this.axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_API_KEY}`)
        .then((response) => response.data.results[0].geometry.location)
}

module.exports = mapService