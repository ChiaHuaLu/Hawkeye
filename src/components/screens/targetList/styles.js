import Constants from '../../../constants/constants';

export default styles = {
	listItem: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	activeTarget: {
		backgroundColor: Constants.primaryThemeColor,
	},
	itemDescription: {
		fontWeight: 'bold',
	},
	itemStatus: {
	},
	itemDetails: {
		fontSize: 15,
	},
	container: {
		flex: 1,
	},
	noTargetsView: {
		alignItems: 'center',
	},
	noTargetsText: {
		fontSize: 20,
		color: '#aaaaaa',
	},
};
