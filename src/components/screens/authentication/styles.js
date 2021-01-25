import Constants from '../../../constants/constants';

export const styles = {
	authForm: {
		alignSelf: 'center',
	},
	authScreenContainer: {
		flex: 1,
		justifyContent: 'center',
	},
};

export const authFormStyles = {
	container: {
		justifyContent: 'space-around',
		flex: 1,
	},
	center: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	alternateAuthText: {
		color: 'blue',
	},
	button: {
		marginHorizontal: 30,
	},
	formSection: {
		padding: 20,
	},
	primaryButtonStyle: {
		backgroundColor: Constants.primaryThemeColor,
	},
	title: {
		color: Constants.primaryThemeColor,
	},
	logo: {
		width: 200,
		height: 200,
		position: 'absolute',
		top: -50
	},
	iconSize: 20,
};
