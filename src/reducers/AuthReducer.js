const INITIAL_STATE = {
	error: {},
	loading: false
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'authenticate_success':
			return {
				loading: false
			};
		case 'authenticate_failure':
			return {
				loading: false,
				error: action.payload
			};
		case 'loading':
			return {
				loading: true,
				error: {}
			}
		case 'clear_error':
			return {
				error: {}
			}
		default:
			return state;
	}
}
