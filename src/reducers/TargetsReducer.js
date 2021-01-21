
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
		case 'delete_target':
			const accessCode = action.payload.accessCode;
			var targets = { ...state.targets };
			delete targets[accessCode];
			return {...state, targets: targets }
		default:
			return state;
	}
};
