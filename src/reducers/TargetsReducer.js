import { actionTypes } from '../actions/types';

const INITIAL_STATE = {
	targets: {},
	activeTarget: '',
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.target.addTarget:
			return {
				...state,
				targets: {
					...state.targets,
					...{[action.payload.accessCode]: {name: action.payload.name}},
				},
			};
		case actionTypes.target.fetchTargets:
			return {
				...state,
				targets: state.targets,
			};
		case actionTypes.target.deleteTarget:
			const accessCode = action.payload.accessCode;
			var updatedTargets = { ...state.targets };
			delete updatedTargets[accessCode];

			return {
				...state,
				targets: {...updatedTargets},
				activeTarget: state.activeTarget === accessCode ?  '' : state.activeTarget,
			};
		case actionTypes.target.trackTarget:
			const newActiveTarget = action.payload;

			return {
				...state,
				activeTarget: newActiveTarget === state.activeTarget ? '' : newActiveTarget,
			};
		default:
			return state;
	}
};
