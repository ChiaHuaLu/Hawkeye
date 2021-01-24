import { actionTypes } from '../actions/types';

const INITIAL_STATE = {
	error: {},
	loading: false,
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.auth.authenticationSuccess:
			return {
				loading: false,
			};
		case actionTypes.auth.authenticationFailure:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.auth.loading:
			return {
				loading: true,
				error: {},
			};
		case actionTypes.auth.clearError:
			return {
				error: {},
			};
		default:
			return state;
	};
};
