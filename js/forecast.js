
function request(latitude, longitude, accuracy) {
	// also look at http://openweathermap.org/API

	$.getJSON('https://api.forecast.io/forecast/07b1f5c9692aa58c2625794bebef237a/' + latitude + ',' + longitude + "?callback=?", function(data) {
    	process(data);
    });
}

function findBestIndex(data, time) {
	best = 0;
	bestDifference = Math.abs(data.hourly.data[0].time - time);
	for(var i = 0; i < data.hourly.data.length; i++) {
		if ( Math.abs(data.hourly.data[i].time - time) < bestDifference ) {
			best = i;
			bestDifference = Math.abs(data.hourly.data[i].time - time);
		}
	}

	return best;
}

function process(data) {
	if (! data.daily.data[0].sunsetTime) {
		sunsetTime = null;
		datapoint = data.currently; // TODO
		console.log("No sunset!");
	} else {
		sunsetTime = data.daily.data[0].sunsetTime;
		sunriseTime = data.daily.data[0].sunriseTime;
		sunset  = new Date(sunsetTime * 1000);
		sunrise = new Date(sunriseTime * 1000);
		console.log("Today sunset is/was at " + sunset);
		console.log("Today sunrise is/was at " + sunrise);

		// in this case the sunset for today is already gone
		if ( sunsetTime < data.hourly.data[0].time ) {
			sunsetTime = data.daily.data[1].sunsetTime;
			sunset = new Date(sunsetTime * 1000);
			console.log("Choosing next sunset: " + sunset );
		} else {
			// sunset is in the future, what about the sunrise?
			if ( sunriseTime < data.hourly.data[0].time ) {
				sunriseTime = null;
				sunset = null;
				console.log("Not displaying sunrise, since in the past");
			}
		}

		sunsetIndex = findBestIndex(data, sunsetTime);
		left = Math.max(0, sunsetIndex - 1);
		sunsetData = data.hourly.data.slice(left, left + 3);

		if ( sunriseTime != null ) {
			sunriseIndex = findBestIndex(data, sunriseTime);
			left = Math.max(0, sunriseIndex - 1);
			sunriseData = data.hourly.data.slice(left, left + 3);
		}
	}

	// define a set of features, each feature weights at most 1
	/*score = 0.0;
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
	index = (score * (conditions.length - 1)) | 0;*/

	output(sunset, sunsetData, sunrise, sunriseData);
}