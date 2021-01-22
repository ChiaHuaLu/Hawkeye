import firebase from 'firebase';

export const updateLocation = (location, accessCode) => {
	return (dispatch) => {
		//Access Firebase
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
			payload: accessCode
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
