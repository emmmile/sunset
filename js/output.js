
function output(data, situation) {
	var el = document.getElementById("weather");
	el.innerHTML = "Summary: <strong>" + data.currently.summary + "</strong>"
	"<br>Cloud cover: " + (data.currently.cloudCover*100) + "%"
	"<br>Humidity: " + (data.currently.humidity*100) + "%"
	"<br>Temperature: " + (Math.round(((data.currently.temperature - 32) * 5 / 9)*100)/100) + "°C";

	el = document.getElementById("summary");
	el.innerHTML = "Conditions are<br><strong class=\"important\">" + situation + ".</strong><br>";
}