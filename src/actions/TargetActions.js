
export const addTarget = (description, accessCode) => {
	return ({
		type: 'add_target',
		payload: {[accessCode]: {name: description}}
	});
};

export const deleteTarget = (accessCode) => {
	return ({
		type: 'delete_target',
		payload: {accessCode}
	});
};

export const fetchTargets = () => {
	return ({
		type: 'fetch_targets'
	})
}
