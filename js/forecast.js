

function request() {
	var xmlhttp;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        process(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", "js/example.json", true);
	xmlhttp.send();

	// temporary
	getLocation();
}

function process(responseText) {
	object = JSON.parse(responseText);

	var x = document.getElementById("another");

	x.innerHTML = "Summary: " + object['currently']['summary'] + "<br>" +
	"Cloud cover: " + object['currently']['cloudCover'] + "<br>" +
	"Humidity: " + object['currently']['humidity'];
}