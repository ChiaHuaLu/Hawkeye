const INITIAL_STATE = {
	accessCode: ''
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'location_updated':
			return {...state, accessCode: action.payload};
		case 'location_deleted':
			return {...state, accessCode: ''};
		default:
			return state;
	}
};
