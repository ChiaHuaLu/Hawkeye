import GetLocation from 'react-native-get-location';

export const getLocation = (action, timeout) => {
	console.log("Getting Location", action)
	GetLocation.getCurrentPosition({
		enableHighAccuracy: true,
		timeout:  timeout * 1000,
	})
	.then((location) => action(location))
	.catch((error) => {
		console.log(error)
	});
};

export const getLocationInterval = (action, timeout, interval) => {
	getLocation(action, timeout);

	return setInterval(() => {
		getLocation(action, timeout);
	}, interval * 1000);
}
