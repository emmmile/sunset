var conditions = [
	"awful",
	"bad",
	"fair",
	"good",
	"excellent",
	"epic"
];

function request(latitude, longitude, accuracy) {
	// also look at http://openweathermap.org/API

	$.getJSON('https://api.forecast.io/forecast/07b1f5c9692aa58c2625794bebef237a/' + latitude + ',' + longitude + "?callback=?", function(data) {
    	process(data);
    });
}

// ogni parametro dovrebbe essere pesato, es. clouds sono piu' importanti
// pesare i parametri singoli e' riduttivo. Sarebbe meglio andare a coppie opppure prendere tutto insieme.

function cloudCoverFunction(cloudCover, a, b) {
	cloudCover *= cloudCover; // because the number seems to be a lot higher than actually is

	//a = 0.25;		// score at cloudCover 0
	//b = 0.4; 		// maximum score is when cloudCover is?

	C = a;
	B = (1 - a + a * b * b) / (b - b * b);
	A = -a - B;

	return A * cloudCover * cloudCover + B * cloudCover + C;
}

function humidityFunction(humidity) {
	return 0.8 + 0.2 * humidity; // humidity doesn't really matters
}

function process(data) {
	if (! data.daily.data[0].sunsetTime) {
		sunsetTime = null;
		datapoint = data.currently; // TODO
	} else {
		sunsetTime = data.daily.data[0].sunsetTime;

		best = 0;
		for(var i = 0; i < data.hourly.data.length; i++) {
			if ( Math.abs(data.hourly.data[i].time - data.hourly.data[best].time) <
			     Math.abs(data.hourly.data[i].time - sunsetTime) )
				best = i;
		}

		console.log("Datapoint " + data.hourly.data[best].time + 
			"(" + format(new Date(data.hourly.data[best].time * 1000)) + ") is the closest to sunset time.");
		sunsetTime = new Date(sunsetTime * 1000); // seconds
		datapoint = data.hourly.data[best];
	}

	// define a set of features, each feature weights at most 1
	score = 0.0;
	features = 3;
	cloudCover = datapoint.cloudCover;
	humidity = datapoint.humidity;
	temperature = datapoint.temperature;
	precipProbability = datapoint.precipProbability;
	apparentTemperature = datapoint.apparentTemperature;


	score += cloudCoverFunction(cloudCover, 0.2, 0.4);
	score += humidityFunction(humidity);
	score += cloudCoverFunction(precipProbability, 0.5, 0.2);

	score /= features;
	index = (score * (conditions.length - 1)) | 0;

	datapoint.sunsetTime = sunsetTime;
	output(datapoint, conditions[index]);
}