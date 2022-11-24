let myMapDetails
const labels = "123456789";
let labelIndex = 0;

const eventID = document.getElementById("eventID").value
console.log(eventID)

function init() {
    getEvents()
}
function renderMap(event) {
    const lat = event.location.coordinates[1]
    const lng = event.location.coordinates[0]

    myMapDetails = new google.maps.Map(
        document.querySelector('#myMapDetails'),
        {
            zoom: 17,
            center: { lat: lat, lng: lng }
        }
    )
    setMarkers(event)
}
function getEvents() {

    axios
        .get(`/api/${eventID}/details`)
        .then(response => renderMap(response.data))
        .catch(err => console.log(err))
}

function setMarkers(event) {


    const lat = event.location.coordinates[1]
    const lng = event.location.coordinates[0]
    const infoWindow = new google.maps.InfoWindow({
        content: event.address
    })


    const marker = new google.maps.Marker({
        map: myMapDetails,
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
}
