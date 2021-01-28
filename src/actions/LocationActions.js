import firebase from 'firebase';

import { actionTypes } from './types';

export const fetchLocation = (accessCode) => {
	if (!accessCode)
		return {
			type: actionTypes.location.fetchLocation,
			payload: {},
		}
	return (dispatch) => {
		console.log("Fetch Location");
		firebase.database().ref(`location/${accessCode}`).once('value').then((snapshot) => {
			const payload = {[accessCode]: snapshot.val()};

			dispatch({
				type: actionTypes.location.fetchLocation,
				payload: payload,
			})
		});
	};
};

export const uploadCurrentLocation = ({ altitude, latitude, longitude, time}, accessCode) => {
	console.log("Upload Location to Firebase");
	const location = { altitude, latitude, longitude, time };
	return (dispatch) => {
		if (accessCode) {
			firebase.database().ref(`location/${accessCode}`).update(location);
		} else {
			accessCode = firebase.database().ref().child('location').push().key;
			var updates = {};
			updates[`${accessCode}`] = location;
			firebase.database().ref('location').update(updates);
		}

		dispatch({
			type: actionTypes.location.updateCurrentLocation,
			payload: {
				currentLocation: location,
				accessCode: accessCode,
			},
		});
	};
};

export const updateCurrentLocation = ({altitude, latitude, longitude, time}, accessCode) => {
	console.log("Update Location State");
	const location = { altitude, latitude, longitude, time };
	return {
		type: actionTypes.location.updateCurrentLocation,
		payload: {
			currentLocation: location,
			accessCode: accessCode,
		},
	};
};

export const deleteLocation = (accessCode) => {
	console.log("Delete Location", accessCode, "from database");
	return (dispatch) => {
		firebase.database().ref(`location/${accessCode}`).remove();
		dispatch({
			type: actionTypes.location.deleteLocation,
		});
	};
};
