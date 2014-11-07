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


function output(data, situation) {
	var el = document.getElementById("weather");
	/*el.innerHTML = "Summary: <strong>" + data.summary + "</strong>" +
	"<br><i class=\"wi wi-day-lightning\"></i>" +
	"<br>Cloud cover: " + round(data.cloudCover * 100, 2) + "%" +
	"<br>Temperature: " + round((data.temperature - 32.0) * 5 / 9, 1) + "°C" + 
	"<br>Sunset time: " + (data.sunsetTime == null ? "NA" : (format(data.sunsetTime) +
						  ((data.sunsetTime.getDay() != (new Date().getDay())) ? " (tomorrow)" : "")));*/
	el.innerHTML = "Sunset time: " + (data.sunsetTime == null ? "NA" : (format(data.sunsetTime) +
						  ((data.sunsetTime.getDay() != (new Date().getDay())) ? " (tomorrow)" : "")));

	// TODO for every data point...
	// Map icon into icons :)

	table = document.createElement("TABLE");
	header = table.createTHead();
	row =     header.insertRow(0);
	time =    row.insertCell(0)
	icon =    row.insertCell(1);
	summary = row.insertCell(2);
	temp =    row.insertCell(3);
	cloud =   row.insertCell(4);

	time.innerHTML    = "Time";
	icon.innerHTML    = "Icon";
	summary.innerHTML = "Summary";
	temp.innerHTML    = "Temperature";
	cloud.innerHTML   = "Cloud Cover";

	row =     table.insertRow(1);
	time =    row.insertCell(0)
	icon =    row.insertCell(1);
	summary = row.insertCell(2);
	temp =    row.insertCell(3);
	cloud =   row.insertCell(4);

	time.innerHTML    = format(new Date(data.time * 1000));
	icon.innerHTML    = "<i class=\"wi " + icons[data.icon] + "\"></i>";
	summary.innerHTML = data.summary;
	temp.innerHTML    = round((data.temperature - 32.0) * 5 / 9, 1) + "°C";
	cloud.innerHTML   = round(data.cloudCover * 100, 2) + "%";

	console.log(data.icon);

	el.appendChild(table);
}
