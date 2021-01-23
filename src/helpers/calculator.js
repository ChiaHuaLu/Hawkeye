

export const degrees_to_radians = (degrees) => {
	return degrees * (Math.PI/180);
}

export const radians_to_degrees = (radians) => {
	return radians * (180/Math.PI);
}

export const bearingToTarget = (location, target) => {
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
	return bearing.toFixed(4);
}

export const heightDifferenceBetweenCoordinates = (location, target) => {
	return target.altitude - location.altitude;
}

export const elevationToTarget = (location, target) => {
	const deltaHeight = heightDifferenceBetweenCoordinates(location, target);
	const distanceBetween = groundDistanceBetweenCoordinates(location, target);
	if (distanceBetween == 0) {
		return deltaHeight > 0 ? 90 : -90;
	}
	return radians_to_degrees(Math.atan(deltaHeight/distanceBetween)).toFixed(4);
}

export const groundDistanceBetweenCoordinates = (location, target) => {
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

export const directDistance = (location, target) => {
	const { latitude, longitude } = location;
	const { latitude: targetLatitude, longitude: targetLongitude} = target;

	const groundDistance = groundDistanceBetweenCoordinates(location, target);
	const heightDifference = heightDifferenceBetweenCoordinates(location, target);

	const hypotenuse = Math.sqrt(groundDistance ** 2 + heightDifference ** 2);
	return hypotenuse.toFixed(4);
}

export const meterToYard = (meters) => {
	const yardsPerMeter = 1.09361;
	return meters * yardsPerMeter;
}
