import Constants from '../../../constants/constants';

const reticleSize = 40;

export default styles = {
	directionsDisplay: {
		padding: 20,
		alignItems: 'center',
	},
	directionsText: {
		color: Constants.primaryThemeColor
	},
	container: {
		backgroundColor: Constants.secondaryThemeColorTranslucent,
	},
	indicator: {
		alignItems: 'center',
	},
	cameraView: {
		flex: 1,
		height: 100,
	},
	safeAreaView: {
		flex: 1,
	},
	reticle: {
		height: reticleSize,
		width: reticleSize,
		borderWidth: 4,
		borderRadius: reticleSize/2,
	},
	reticleArrow: {
		width: 10,
		height: 10,
		backgroundColor: "transparent",
	    borderStyle: "solid",
	    borderLeftWidth: 10,
	    borderRightWidth: 10,
	    borderBottomWidth: 20,
	    borderLeftColor: "transparent",
	    borderRightColor: "transparent",

	},
	reticleArrowContainer: {
		...styles.reticleContainer,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		height: reticleSize * 3,
		width: 20,
	},
	reticleContainer: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		flexDirection: 'column',
	},
};
