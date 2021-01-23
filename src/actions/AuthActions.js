import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const clearError = () => {
	return {
		type: 'clear_error',
	}
};

export const dispatchLoadingAction = () => {
	return {
		type: 'loading'
	};
};

export const signIn = (email, password) => {
	return (dispatch) => {
		dispatchLoadingAction(dispatch);
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				dispatch({
					type: 'authenticate_success'
				});
				Actions.mainFlow();
			})
			.catch((err) => {
				dispatch({
					type: 'authenticate_failure',
					payload: {code: err.code, message: err.message}
				})
			});
	};
};

export const register = (email, password) => {
	return (dispatch) => {
		dispatchLoadingAction(dispatch);
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				dispatch({
					type: 'authenticate_success'
				});
				Actions.mainFlow();
			})
			.catch((err) => {
				dispatch({
					type: 'authenticate_failure',
					payload: {code: err.code, message: err.message}
				})
			});
	};
};
