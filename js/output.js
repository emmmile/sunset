// http://erikflowers.github.io/weather-icons/

var icons = {
	"clear-day" : "wi-day-sunny", 
	"clear-night": "wi-night-clear", 
	"rain": "wi-rain",
	"snow": "wi-snow",
	"sleet": "wi-rain-mix",
	"wind": "wi-cloudy-windy",
	"fog": "wi-fog",
	"cloudy": "wi-cloudy",
	"partly-cloudy-day": "wi-day-cloudy",
	"partly-cloudy-night": "wi-night-cloudy"
};

function createRow(row, time, icon, summary, temp, cloud, wind) {
	var timec =    row.insertCell(0)
	var iconc =    row.insertCell(1);
	var summaryc = row.insertCell(2);
	var tempc =    row.insertCell(3);
	var cloudc =   row.insertCell(4);
	var windc =   row.insertCell(5);

	timec.innerHTML    = time;
	iconc.innerHTML    = icon;
	summaryc.innerHTML = summary;
	tempc.innerHTML    = temp;
	cloudc.innerHTML   = cloud;
	windc.innerHTML   = wind;
}

function createHeader(row, time, summary, temp, cloud, wind) {
	var timec =    row.insertCell(0)
	var summaryc = row.insertCell(1);
	var tempc =    row.insertCell(2);
	var cloudc =   row.insertCell(3);
	var windc =   row.insertCell(4);

	timec.innerHTML    = time;
	summaryc.innerHTML = summary;
	tempc.innerHTML    = temp;
	cloudc.innerHTML   = cloud;
	windc.innerHTML   = wind;

	summaryc.colSpan = 2;
}

function direction ( wb ) {
	if ( wb === undefined ) return "";
	wb = (wb + 22.5 + 360) % 360;
	if ( wb >= 0 && wb < 45 ) return "N";
	if ( wb >= 45 && wb < 90 ) return "NW";
	if ( wb >= 90 && wb < 135 ) return "W";
	if ( wb >= 135 && wb < 180 ) return "SW";
	if ( wb >= 180 && wb < 225 ) return "S";
	if ( wb >= 225 && wb < 270 ) return "SE";
	if ( wb >= 270 && wb < 315 ) return "E";
	if ( wb >= 315 && wb < 360 ) return "NE";
}

function addItem ( time, data, elementId) {
	var father = document.getElementById("weather");
	var el = document.createElement("div");
	var itemStr = document.createElement("p");
	itemStr.className = "important";
	console.log(time);
	itemStr.innerHTML = elementId + " time: " + (time == null ? "NA" : (format(time) + " (" +
						  time.getDate() + "/" + (time.getMonth()+1) + ")"));

	var table  = document.createElement("TABLE");

	for ( i = 0; i < data.length; ++i ) {
		var datapoint = data[i];
		console.log( datapoint.windBearing + " -> " + direction(datapoint.windBearing) );

		var row = table.insertRow();
		createRow(row, 
			format(new Date(datapoint.time * 1000)), 
			"<i class=\"wi " + icons[datapoint.icon] + "\"></i>", datapoint.summary, 
			round((datapoint.temperature - 32.0) * 5.0 / 9.0, 1), // + "°C", 
			round(datapoint.cloudCover * 100, 0) + "%", 
			round(datapoint.windSpeed * 1.60934, 1) + direction(datapoint.windBearing));

		console.log(datapoint.icon);
	}

	var header = table.createTHead();
	var hrow    = header.insertRow(0);
	createHeader(hrow, "Time", "Summary", "°C", "Clouds", "Wind");

	el.id = elementId;
	el.innerHTML = "";
	el.appendChild(itemStr);
	el.appendChild(table);
	el.style.display = "block";
	father.appendChild(el);
}


function output(data) {
	var father = document.getElementById("weather");
	father.innerHTML = "";
	if ( data.sunset < data.sunrise ) {
		addItem(data.sunset, data.sunsetData, "sunset");
		addItem(data.sunrise, data.sunriseData, "sunrise");
	} else {
		addItem(data.sunrise, data.sunriseData, "sunrise");
		addItem(data.sunset, data.sunsetData, "sunset");
	}
}
