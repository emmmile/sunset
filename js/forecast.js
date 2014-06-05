
var data;

function request() {
	var uri = "js/example.json";

	var request;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	    request = new XMLHttpRequest();
	} else { // code for IE6, IE5
	    request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	/* in case of async: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
	request.onreadystatechange = function() {
	    if (request.readyState == 4 && request.status == 200) {
	        process(request.responseText);
	    }
	}*/

	request.open("GET", uri, false); // false = sync, true = async
	request.send();

	if ( request.status == 200 ) {
		data = request.responseText;
	}
}

function process() {
	data = JSON.parse(data);

	// process the data
}