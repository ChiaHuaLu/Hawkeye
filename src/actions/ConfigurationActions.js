export const setCameraAngleOfView = ({horizontalAngleOfView, verticalAngleOfView}) => {
	return {
		type: 'setAngleOfView',
		payload: {
			horizontalAngleOfView,
			verticalAngleOfView,
		}
	}
}

export const resetCameraAngleOfView = () => {
	return {
		type: 'resetAngleOfView',
	}
}
