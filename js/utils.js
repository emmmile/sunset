
function format(date) {
	return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

function round(number, decimals) {
	factor = Math.pow(10, decimals);
	return Math.round(number * factor) / factor;
}