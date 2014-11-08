var errorMessage;
var geocoder;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handlePosition,showError);
    } else {
        errorMessage = "Geolocation is not supported by this browser.";
        getLocationFromUser('The location seems to be unavailable. Enter something yourself:');
    }
}

function displayLocation(latitude, longitude, accuracy, name) {
    a = accuracy;
    accuracyString = (a >= 1000) ? "km" : "m";
    a = round(((a >= 1000) ? a / 1000 : a), 2);

    document.getElementById("location").innerHTML = 
    ((name != null) ? name + "<br>" : "") +
    "Latitude: " + round(latitude, 8) +
    "<br>Longitude: " + round(longitude, 8) + 
    ((accuracy != 0) ? ("<br>GPS Accuracy: " + a + accuracyString) : "");
}

function handlePosition(position) {
	displayLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy);

    request(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
}

function showError(error) {

    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred."
            break;
    }

    getLocationFromUser('There was an error getting the location. Enter something yourself:');
}

function getLocationFromUser(message) {
    document.getElementById('user-location-label').innerHTML = message;
    document.getElementById('user-location-container').style.display= 'block';
}

function resolveLocationFromUser() {
    var userLocation = $('#user-location').val();
    //alert("You entered \"" + userLocation + "\". I'm working on it.");
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation,
        success: function(data) {
            latitude = data.results[0].geometry.location.lat;
            longitude = data.results[0].geometry.location.lng;
            name = data.results[0].formatted_address;

            displayLocation(latitude, longitude, 0, name);

            request(latitude, longitude);
        }
    });
}

window.onload = function () { getLocation(); }