const INITIAL_STATE = {
	camera: {
		horizontalAngleOfView: 40,
		verticalAngleOfView: 55,
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'setAngleOfView':
			return {...state, camera: action.payload};
		case 'resetAngleOfView':
			return {...state, camera: INITIAL_STATE.camera};
		default:
			return state;
	}
}
