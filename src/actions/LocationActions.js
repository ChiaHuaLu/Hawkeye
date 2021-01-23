import firebase from 'firebase';

export const fetchLocation = (accessCode) => {
	return (dispatch) => {
		console.log("Fetch Location")
		firebase.database().ref(`location/${accessCode}`).once('value').then((snapshot) => {
			const payload = {[accessCode]: snapshot.val()};

			dispatch({
				type: 'fetch_location',
				payload: payload
			})
		});
	}
};

export const uploadCurrentLocation = ({ altitude, latitude, longitude, time}, accessCode) => {
	console.log("Upload Location to Firebase")
	const location = { altitude, latitude, longitude, time };
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

export const updateCurrentLocation = ({altitude, latitude, longitude, time}, accessCode) => {
	console.log("Update Location State")
	const location = { altitude, latitude, longitude, time };
	return {
		type: 'location_updated',
		payload: {
			currentLocation: location,
			accessCode: accessCode
		}
	};
}

export const deleteLocation = (accessCode) => {
	console.log("Delete Location", accessCode, "from database")
	return (dispatch) => {
		firebase.database().ref(`location/${accessCode}`).remove()
		dispatch({
			type: 'location_deleted',
		})
	}
};
