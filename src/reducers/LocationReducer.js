import { actionTypes } from '../actions/types';

const INITIAL_STATE = {
	accessCode: '',
	currentLocation: {},
	targetLocations: {},
	loading: false,
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.location.updateCurrentLocation:
			return {
				...state,
				loading: false,
				accessCode: action.payload.accessCode,
				currentLocation: action.payload.currentLocation,
			};
		case actionTypes.location.deleteLocation:
			return {
				...state,
				accessCode: '',
				loading: false,
				currentLocation: {},
			};
		case actionTypes.location.fetchLocation:
			return {
				...state,
				loading: false,
				targetLocations: {
					...state.targetLocations,
					...action.payload,
				},
			};
		case actionTypes.target.deleteTarget:
			const accessCode = action.payload.accessCode;
			var updatedTargets = { ...state.targetLocations };
			delete updatedTargets[accessCode];
			return {
				...state,
				targetLocations: updatedTargets,
				loading: false,
			};
		case actionTypes.target.addTarget:
			return {
				...state,
				loading: false,
				targetLocations: {
					...state.targetLocations,
					...{[action.payload.accessCode]: {name: action.payload.name}},
				},
			};
		default:
			return state;
	};
};
