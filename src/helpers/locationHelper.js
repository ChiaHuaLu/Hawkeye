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

export const runIntervalIfConditionMet = (actionNeedingLocation, timeout, interval, condition) => {
	const getAndProcessLocation = () => {
		getLocation(actionNeedingLocation, timeout);
	};

	getAndProcessLocation();

	return setInterval(() => {
		if (condition()) {
			getAndProcessLocation();
		}
	}, interval * 1000);
};
