var data;

var conditions = [
	"awful",
	"bad",
	"fair",
	"good",
	"excellent"
];

var situation;

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

function cloudCoverFunction(cloudCover) {
	b = 0.4; 		// maximum score is when cloudCover is?
	a = 0.25;		// score at cloudCover 0
	c = 1;			// score at cloudCover 1

	C = a;
	B = (1 - a + a * b * b) / (b - b * b);
	A = -a - B;

	return A * cloudCover * cloudCover + B * cloudCover + C;
}

function humidityFunction(humidity) {
	return 1.0;
}

function process() {
	data = JSON.parse(data);

	score = 0.0;

	// define a set of features, each feature weights at most 1
	features = 2;
	cloudCover = data['currently']['cloudCover'];
	humidity = data['currently']['humidity'];

	score += cloudCoverFunction(cloudCover);
	score += humidityFunction(humidity);
	score /= features;
	index = (score * conditions.length) | 0;
	alert( "" + index );

	situation = "good";
}