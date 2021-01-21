

function degrees_to_radians(degrees) {
	return degrees * (Math.PI/180);
}

function radians_to_degrees(radians) {
	return degrees = radians * (180/Math.PI);
}

function bearing(location, target) {
	const { latitude, longitude } = location;
	const { latitude: targetLatitude, longitude: targetLongitude} = target;

	const angleToViewerNS = degrees_to_radians(latitude);
	const angleToViewerEW = degrees_to_radians(targetLatitude);
	const deltaAngleNS = degrees_to_radians(targetLatitude-latitude);
	const deltaAngleEW = degrees_to_radians(targetLongitude-longitude);

	//==================Heading Formula Calculation================//

	const y = Math.sin(deltaAngleEW) * Math.cos(angleToViewerEW);
	const x = Math.cos(angleToViewerNS) * Math.sin(angleToViewerEW) - Math.sin(angleToViewerNS) * Math.cos(angleToViewerEW) * Math.cos(deltaAngleEW);
	const bearingTotal = radians_to_degrees(Math.atan2(y,x));
	const bearing = ( (bearingTotal + 360) % 360 );

	console.log("Heading:", bearing)

	return bearing;
}

function groundDistanceMeters(location, target) {
	const { latitude, longitude } = location;
	const { latitude: targetLatitude, longitude: targetLongitude} = target;

	const R = 6371e3;
	const angleToViewerNS = latitude * Math.PI/180;
	const angleToViewerEW = targetLatitude * Math.PI/180;
	const deltaAngleNS = (targetLatitude-latitude) * Math.PI/180;
	const deltaAngleEW = (targetLongitude-longitude) * Math.PI/180;

	const a = Math.sin(deltaAngleNS/2) * Math.sin(deltaAngleNS/2) +
	          Math.cos(angleToViewerNS) * Math.cos(angleToViewerEW) *
	          Math.sin(deltaAngleEW/2) * Math.sin(deltaAngleEW/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	const distance = R * c; // in metres
	return distance;
}

function meterToYard(meters) {
	const yardsPerMeter = 1.09361;
	return meters * yardsPerMeter;
}
