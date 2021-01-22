import firebase from 'firebase';

export const fetchLocation = (accessCode) => {
	return (dispatch) => {
		firebase.database().ref(`location/${accessCode}`).once('value').then((snapshot) => {
			const payload = {[accessCode]: snapshot.val()};
			dispatch({
				type: 'fetch_location',
				payload: payload
			})
		});

		// firebase.database().ref(`location/${accessCode}`).on('value', (snapshot) => {
		// 	console.log("Fetch", snapshot.val());
		// 	const payload = {[accessCode]: snapshot.val()};
		// 	// console.log("Payload", payload)
		// 	dispatch({
		// 		type: 'fetch_location',
		// 		payload: payload
		// 	})
		// });
	}
};

export const updateLocation = (location, accessCode) => {
	return (dispatch) => {
		if (accessCode) {
			firebase.database().ref(`location/${accessCode}`).update(location)
		} else {
			accessCode = firebase.database().ref().child('location').push().key;
			var updates = {};
			updates[`${accessCode}`] = location;
			firebase.database().ref('location').update(updates)
		}

		dispatch({
			type: 'location_updated',
			payload: {
				currentLocation: location,
				accessCode: accessCode
			}
		})
	}
};

export const deleteLocation = (accessCode) => {
	return (dispatch) => {
		firebase.database().ref(`location/${accessCode}`).remove()
		dispatch({
			type: 'location_deleted',
		})
	}
};
