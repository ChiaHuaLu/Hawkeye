const INITIAL_STATE = {
	accessCode: '',
	currentLocation: {},
	targetLocations: {},
	loading: false,
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'location_updated':
			return {...state, loading: false, accessCode: action.payload.accessCode, currentLocation: action.payload.currentLocation};
		case 'location_deleted':
			return {...state, accessCode: '', loading: false, currentLocation: {}};
		case 'fetch_location':
			return {...state, loading: false, targetLocations: {...state.targetLocations, ...action.payload}};
		case 'delete_target':
			const accessCode = action.payload.accessCode;
			var updatedTargets = { ...state.targetLocations };
			delete updatedTargets[accessCode];
			return {...state, targetLocations: updatedTargets, loading: false, }
		case 'add_target':
			return {...state, loading: false, targetLocations: {...state.targetLocations, ...{[action.payload.accessCode]: {name: action.payload.name}}}};
		default:
			return state;
	}
};
