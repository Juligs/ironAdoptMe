let myMap
function init() {
    renderMap()
    getEvents()
}
function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 16,
            center: { lat: 7.073365000301889, lng: -73.11252818908491 }
        }
    )
}

function getEvents() {

    axios
        .get('/api/events')
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
}


function setMarkers(events) {

    events.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: myMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}

