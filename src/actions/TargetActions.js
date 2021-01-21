export const action = () => {
	return ({
		type: 'type',
		payload: {}
	});
};

export const addTarget = (description, accessCode) => {
	return ({
		type: 'add_target',
		payload: {description, accessCode}
	});
};
