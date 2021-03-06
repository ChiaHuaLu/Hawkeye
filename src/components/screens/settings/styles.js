import Constants from '../../../constants/constants';

export default styles = {
	buttonsContainer : {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-around',
	},
	middleContainer: {
		justifyContent: 'center',
		flex: 1,
	},
	locationButtonsContainer: {
		alignSelf: 'stretch',
	},
	accessCodeButtons: {
		width: "40%",
	},
	locationButtons: {
		margin: 5,
	},
	deleteButton: {
		backgroundColor: 'red',
	},
	container: {
		alignItems: 'center',
		padding: 15,
		flex: 1,
	},
	accessCode: {
		color: 'red',
		margin: 15,
		fontWeight: 'bold',
	},
	safeAreaView: {
		flex: 1,
	},
	signOutButton: {
		paddingRight: 10,
	},
	primaryButtonStyle: {
		backgroundColor: Constants.primaryThemeColor,
	},
	copyButtonIcon: {
		iconSize: 20,
		color: 'white',
	},
	broadcastImage: {
		flex: 1,
	    width: 250,
	    resizeMode: 'contain',
	}
};
