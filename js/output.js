
function output(data, situation) {
	var el = document.getElementById("weather");
	el.innerHTML = "Summary: " + data['currently']['summary'] + 
	"<br>Cloud cover: " + data['currently']['cloudCover'] + 
	"<br>Humidity: " + data['currently']['humidity'];

	el = document.getElementById("summary");
	el.innerHTML = "Conditions are<br><strong>" + situation + ".</strong><br>";
}