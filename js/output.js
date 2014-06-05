
function output() {
	var el = document.getElementById("weather");

	el.innerHTML = "Summary: " + data['currently']['summary'] + 
	"<br>Cloud cover: " + data['currently']['cloudCover'] + 
	"<br>Humidity: " + data['currently']['humidity'];
}