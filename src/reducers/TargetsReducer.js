
const INITIAL_STATE = {
	targets: {

	}
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'add_target':
			return {...state, targets: {...state.targets, ...action.payload}};
		case 'fetch_targets':
			return {...state};
		default:
			return state;
	}
};
