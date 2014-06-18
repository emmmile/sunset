
function output(data, situation) {
	var el = document.getElementById("weather");
	el.innerHTML = "Summary: <strong>" + data.summary + "</strong>" +
	"<br>Cloud cover: " + round(data.cloudCover * 100, 2) + "%" +
	"<br>Temperature: " + round((data.temperature - 32.0) * 5 / 9, 2) + "°C" + 
	"<br>Sunset time: " + (data.sunsetTime == null ? "NA" : (format(data.sunsetTime) +
						  ((data.sunsetTime.getDay() != (new Date().getDay())) ? " (tomorrow)" : "")));

	el = document.getElementById("situation");
	el.innerHTML = //round(data.score, 2) + ": " + 
				   situation;

    document.getElementById('summary').style.display= 'block';
}
