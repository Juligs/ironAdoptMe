let myMap
function init() {
    renderMap()
    getEvents()
}
function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 15,
            center: { lat: 40.39379213602231, lng: -3.6987830210114185 }
        }
    )
}

function getEvents() {

    axios
        .get('/api/events')
        .then(response => setMarkers(response.data))
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

