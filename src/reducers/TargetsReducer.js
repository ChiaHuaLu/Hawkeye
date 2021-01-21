const INITIAL_STATE = {
	targets: {
		'accessCodeA': {name: 'nameA'},
		'accessCodeB': {name: 'nameB'},
		'accessCodeC': {name: 'nameC'},
		'accessCodeD': {name: 'nameD'},
		'accessCodeE': {name: 'nameE'},
		'accessCodeF': {name: 'nameF'},
		'accessCodeG': {name: 'nameG'},
		'accessCodeH': {name: 'nameH'},
		'accessCodeI': {name: 'nameI'},
		'accessCodeJ': {name: 'nameJ'},
		'accessCodeK': {name: 'nameK'},
		'accessCodeL': {name: 'nameL'},
	}
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'add_target':
			return {...state, targets: {...state.targets, ...action.payload}};
		case 'fetch_targets':
			return state;
		default:
			return state;
	}
};
