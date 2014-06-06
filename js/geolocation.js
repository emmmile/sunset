var x = document.getElementById("location");
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

function handlePosition(position) {
	a = position.coords.accuracy;
	accuracyString = (a >= 1000) ? "km" : "m";
	a = Math.round(((a >= 1000) ? a / 1000 : a)*100) / 100;

    x.innerHTML = 
    "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude +
    "<br>Accuracy: " + a + accuracyString;

    //if ( accuracy > 20000 ); // ask to the user

    request(position.coords.latitude, position.coords.longitude);
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
    alert("You entered \"" + userLocation + "\". I'm working on it.");

    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation, function(data) {
        console.log(data.results[0].geometry.location.lat);
        console.log(data.results[0].geometry.location.lng);
        alert(data.results[0].geometry.location);

        request(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
    });

    /*gapi.client.setApiKey(YOUR API KEY);
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': userLocation}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.A);
            console.log(results[0].geometry.location.k);

            request(results[0].geometry.location.A, results[0].geometry.location.k);
        } else {
            console.log(status);
        }
    });*/
}

window.onload = function () { getLocation(); }