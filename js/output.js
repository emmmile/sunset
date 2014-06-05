
function output(data, situation) {
	var el = document.getElementById("weather");
	el.innerHTML = "Summary: " + data.currently.summary + 
	"<br>Cloud cover: " + data.currently.cloudCover + 
	"<br>Humidity: " + data.currently.humidity +
	"<br>Temperature: " + data.currently.temperature -32.0 * 5.0 / 9.0;

	el = document.getElementById("summary");
	el.innerHTML = "Conditions are<br><strong class=\"important\">" + situation + ".</strong><br>";
}