const reticleSize = 30;

export default styles = {
	directionsDisplay: {
		padding: 20,
		alignItems: 'center'

	},
	container: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)'

	},
	indicator: {
		alignItems: 'center'
	},
	cameraView: {
		flex: 1,
		height: 100,

	},
	safeAreaView: {
		flex: 1
	},
	reticle: {
		height: reticleSize,
		width: reticleSize,
		borderWidth: 2,
		borderColor: 'red',
		borderRadius: reticleSize/2
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
