export const action = () => {
	return ({
		type: 'type',
		payload: {}
	});
};

export const addTarget = (description, accessCode) => {
	return ({
		type: 'add_target',
		payload: {[accessCode]: {name: description}}
	});
};

export const fetchTargets = () => {
	return ({
		type: 'fetch_targets'
	})
}
