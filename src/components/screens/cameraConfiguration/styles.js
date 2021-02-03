import SharedStyles from '../../../constants/sharedStyles';

export default styles = {
	contentContainer: {
		flexDirection: 'row',
	},
	cameraAngleConfigContainer: {
		flex: 1,
		height: 400,
		padding: 10,
		alignItems: 'center',
	},
	angleDiagram: {
		flex: 1,
	    width: '90%',
	    resizeMode: 'contain'
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	instruction: {
		margin: 10,
	},
	buttonStyle: {
		...SharedStyles.buttonStyle,
		width: 125
	}
};
