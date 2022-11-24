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
            zoom: 12,
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

    events.forEach(event => {

        const lat = event.location.coordinates[1]
        const lng = event.location.coordinates[0]
        const infoWindow = new google.maps.InfoWindow({
            content: event.address
        })


        const marker = new google.maps.Marker({
            map: myMap,
            draggable: true,
            animation: google.maps.Animation.DROP,
            label: labels[labelIndex++ % labels.length],
            position: { lat, lng },
            title: event.title
        })

        marker.addListener('click', () => {
            const contentString =
                '<div id="content">' +
                `<h5 id="firstHeading" class="firstHeading" style="color:white">${event.title}</h5>` +
                '<div id="bodyContent">' +
                `<p id="textEvent">${event.address}</p>` +
                "</div>"
            infoWindow.close();
            infoWindow.setContent(contentString);
            infoWindow.open(marker.getMap(), marker);
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null)
                }, 2000)

            }
        })
    })
}
