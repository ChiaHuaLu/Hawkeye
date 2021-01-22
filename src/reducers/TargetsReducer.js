
const INITIAL_STATE = {
	targets: {},
	activeTarget: ''
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'add_target':
			return {...state, targets: {...state.targets, ...{[action.payload.accessCode]: {name: action.payload.name}}}};
		case 'fetch_targets':
			return {...state, targets: state.targets};
		case 'delete_target':
			const accessCode = action.payload.accessCode;
			var updatedTargets = { ...state.targets };
			delete updatedTargets[accessCode];
			var currentActiveTarget = state.activeTarget;
			if (currentActiveTarget === accessCode)
				currentActiveTarget = ''
			return {...state, targets: {...updatedTargets}, activeTarget: currentActiveTarget};
		case 'track_target':
			var newActiveTarget = action.payload;
			if (state.activeTarget === newActiveTarget)
				newActiveTarget = '';
			return {...state, activeTarget: newActiveTarget}
		default:
			return state;
	}
};
