var conditions = [
	"awful",
	"bad",
	"fair",
	"good",
	"excellent"
];

function request(latitude, longitude) {
	//var uri = "https://api.forecast.io/forecast/07b1f5c9692aa58c2625794bebef237a/" + latitude + "," + longitude;
	//var uri = "js/example.json";
	//document.getElementById("debug").innerHTML += uri;

	$.getJSON('https://api.forecast.io/forecast/07b1f5c9692aa58c2625794bebef237a/' + latitude + ',' + longitude + "?callback=?", function(data) {
    	process(data);
    });
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
	return 0.8 + 0.2 * humidity;
}

function temperatureFunction(temperature) {
	return 1.0;
}

function process(data) {
	//document.getElementById("debug").innerHTML += "<br>" + JSON.stringify(data);
	score = 0.0;

	// define a set of features, each feature weights at most 1
	features = 3;
	cloudCover = data.currently.cloudCover;
	humidity = data.currently.humidity;
	temperature = data.currently.temperature;

	score += cloudCoverFunction(cloudCover);
	score += humidityFunction(humidity);
	score += temperatureFunction(temperature);
	score /= features;
	index = (score * (conditions.length - 1)) | 0;

	output(data, conditions[index]);
}