export const actionTypes = {
	auth: {
		authenticationSuccess: 'authenticate_success',
		authenticationFailure: 'authenticate_failure',
		loading: 'loading',
		clearError: 'clear_error',
	},
	location: {
		fetchLocation: 'fetch_location',
		updateCurrentLocation: 'update_current_location',
		deleteLocation: 'delete_location',
	},
	target: {
		addTarget: 'add_target',
		fetchTargets: 'fetch_targets',
		deleteTarget: 'delete_target',
		trackTarget: 'track_target',
	}
};
