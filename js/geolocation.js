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
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }

    x.innerHTML += "<br>" + "So maybe you want to enter something manually:" +
    "<form id=\"locationForm\" action=\"\" method=\"post\">" +
      "<input type=\"text\" id=\"userLocation\">" +
      "<input type=\"submit\" onClick=\"return resolveUserLocation()\">" +
    "</form>";
    // http://maps.google.com/maps/api/geocode/json?address=Lucca&sensor=false
}

function resolveUserLocation() {
    var userLocation = $('#userLocation').val()
    alert("You entered '" + userLocation + "'. I'm working on it.");


    /*$.get('maps.google.com/maps/api/geocode/json?address=' + userLocation + '&sensor=false', function(data) {
        alert(data);
    });*/
}

window.onload = function () { getLocation(); }