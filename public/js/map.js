let myMap
const labels = "123456789";
let labelIndex = 0;
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

        const lat = elm.location.coordinates[1]
        const lng = elm.location.coordinates[0]

        new google.maps.Marker({
            map: myMap,
            draggable: true,
            animation: google.maps.Animation.DROP,
            label: labels[labelIndex++ % labels.length],
            position: { lat, lng },
            title: elm.name
        })

    })
    marker.addListener("click", toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


