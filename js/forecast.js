var conditions = [
	"awful",
	"bad",
	"fair",
	"good",
	"excellent"
];

function request(latitude, longitude) {
	//var uri = "https://api.forecast.io/forecast/07b1f5c9692aa58c2625794bebef237a/" + latitude + "," + longitude;
	var uri = "js/example.json";
	document.getElementById("debug").innerHTML += uri;

	jQuery.get(uri, function( data ) {
	  $( ".result" ).html( data );
	  process(null);
	  alert( "Load was performed." );
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
	return 1.0;
}

function process(responseText) {
	data = JSON.parse(responseText);
	alert(data['currently']['cloudCover']);

	score = 0.0;

	// define a set of features, each feature weights at most 1
	features = 2;
	cloudCover = data['currently']['cloudCover'];
	humidity = data['currently']['humidity'];

	score += cloudCoverFunction(cloudCover);
	score += humidityFunction(humidity);
	score /= features;
	index = (score * (conditions.length - 1)) | 0;

	output(data, conditions[index]);
}