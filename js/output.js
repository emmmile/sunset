
function output(data, situation) {
	var el = document.getElementById("weather");
	el.innerHTML = "Summary: <strong>" + data.summary + "</strong>" +
	"<br>Cloud cover: " + (Math.round(data.cloudCover*100)*100)/100 + "%" +
	"<br>Temperature: " + (Math.round(((data.temperature - 32) * 5 / 9)*100)/100) + "°C" + 
	"<br>Sunset time: " + (data.sunsetTime == null ? "NA" : (data.sunsetTime.getHours() + ":" + data.sunsetTime.getMinutes()));

	el = document.getElementById("situation");
	el.innerHTML = Math.round(data.score*100)/100 + ": " + situation + ".";

    document.getElementById('summary').style.display= 'block';
}