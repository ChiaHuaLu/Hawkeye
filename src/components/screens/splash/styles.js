import Constants from '../../../constants/constants';

export const styles = {
	proceedButtonContainer: {
		padding: 20,
		width: '100%',
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 0,
	},
	splashContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		backgroundColor: Constants.secondaryThemeColor,
	},
	textContainer: {
		padding: 20,
		alignItems: 'center',
	},
	logo: {
		width: 300,
		height: 300,
	},
	title: {
		color: Constants.primaryThemeColor,
	},
	primaryButtonStyle: {
		backgroundColor: Constants.primaryThemeColor,
	},
	subtitle: {
		color: Constants.lightThemeColor,
		fontSize: 22,
	},
};
