var x = document.getElementById("location");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handlePosition,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        // TODO: get the location in some other way, e.g. from a text box
    }
}

function handlePosition(position) {
	a = position.coords.accuracy;
	accuracyString = (a >= 1000) ? "km" : "m";
	a = (a >= 1000) ? a / 1000 : a;

    x.innerHTML = 
    "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude +
    "<br>Accuracy: " + a + accuracyString;

    request(position.coords.latitude, position.coords.longitude);
}

function showError(error) {
    var message;

    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred."
            break;
    }

    document.getElementById('user-location-label').innerHTML = 'There was an error getting the location. Enter something yourself:';
    document.getElementById('user-location-container').style.display= 'block';

    // http://maps.google.com/maps/api/geocode/json?address=Lucca&sensor=false
}

function resolveUserLocation() {
    var userLocation = $('#user-location').val();
    alert("You entered '" + userLocation + "'. I'm working on it.");


    /*$.get('maps.google.com/maps/api/geocode/json?address=' + userLocation + '&sensor=false', function(data) {
        alert(data);
    });*/
}

window.onload = function () { getLocation(); }