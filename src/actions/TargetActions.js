import { actionTypes } from './types';

export const addTarget = (description, accessCode) => {
	return ({
		type: actionTypes.target.addTarget,
		payload: {
			accessCode: accessCode,
			name: description,
		},
	});
};

export const deleteTarget = (accessCode) => {
	return ({
		type: actionTypes.target.deleteTarget,
		payload: {accessCode: accessCode},
	});
};

export const fetchTargets = () => {
	return ({
		type: actionTypes.target.fetchTargets,
	});
};

export const toggleTrackTarget = (accessCode) => {
	return ({
		type: actionTypes.target.trackTarget,
		payload: accessCode,
	});
};
