import firebase from 'firebase';

import { actionTypes } from './types';

export const clearError = () => {
	return {
		type: actionTypes.auth.clearError,
	};
};

export const dispatchLoadingAction = () => {
	return {
		type: actionTypes.auth.loading,
	};
};

export const signIn = (email, password) => {
	return (dispatch) => {
		dispatchLoadingAction(dispatch);
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				authenticationSuccess(dispatch);
			})
			.catch((err) => {
				authenticationFailure(dispatch, err);
			});
	};
};

export const register = (email, password) => {
	return (dispatch) => {
		dispatchLoadingAction(dispatch);
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				authenticationSuccess(dispatch);
			})
			.catch((err) => {
				authenticationFailure(dispatch, err);
			});
	};
};

const authenticationSuccess = (dispatch) => {
	dispatch({
		type: actionTypes.auth.authenticationSuccess,
	});
};

const authenticationFailure = (dispatch, err) => {
	dispatch({
		type: actionTypes.auth.authenticationFailure,
		payload: {code: err.code, message: err.message}
	});
};
