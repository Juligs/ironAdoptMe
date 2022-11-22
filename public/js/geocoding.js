function init() {
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': document.getElementById("inputAddress").value }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
        }

        console.log(latitude);
        console.log(longitude);
    })
}