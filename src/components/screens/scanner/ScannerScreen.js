import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import SensorFusionProvider, { useSensorFusion, toDegrees } from 'react-native-sensor-fusion';
import { RNCamera } from 'react-native-camera';

import { fetchLocation, updateCurrentLocation } from '../../../actions/LocationActions';
import { bearingToTarget, directDistance, elevationToTarget } from '../../../helpers/calculator';
import { getLocationInterval } from '../../../helpers/locationHelper';
import styles from './styles';


class ScannerScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			interval: null
		}
	}

	componentWillMount() {
		const getLocation = ((location) => {
			if (!this.props.navigation.isFocused()) {
				clearInterval(this.state.interval);
			}
			console.log("Scanner Get Location")
			this.props.updateCurrentLocation(location, this.props.location.accessCode)
			this.props.fetchLocation(this.props.targets.activeTarget)
		});

		const interval = getLocationInterval(getLocation, 3, 10);
		this.setState({...this.state, interval});
	}

	getDirectionsToTarget() {
		const { activeTarget } = this.props.targets;
		if (activeTarget === '') {
			return <Text h3>No Active Target</Text>
		}
		const targetAccessCode = this.props.targets.activeTarget;
		const myLocation = this.props.location.currentLocation;
		const targetLocation = this.props.location.targetLocations[targetAccessCode];
		const distance = directDistance(myLocation, targetLocation);
		const bearing = bearingToTarget(myLocation, targetLocation);
		const elevationAngle = elevationToTarget(myLocation, targetLocation);
		return (
			<View style={styles.directionsDisplay}>
				<Text h5>Direct Distance To Target:{distance} m</Text>
				<Text h5>Heading To Target: {bearing}°</Text>
				<Text h5>Elevation To Target: {elevationAngle}°</Text>
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<RNCamera
					autoFocus
					captureAudio={false}

					showViewFinder
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.cameraView}
					useNativeZoom={false}
					type={RNCamera.Constants.Type.back}>

						<View style={styles.reticleContainer}>
							<View style={styles.reticle}>

							</View>
						</View>

						<View style={styles.container}>
							{this.getDirectionsToTarget()}
							<SensorFusionProvider>
								<Indicator />
							</SensorFusionProvider>
						</View>
				</RNCamera>

			</SafeAreaView>
		);
	}
}

const Indicator = () => {

	const { ahrs } = useSensorFusion();
	const { heading, pitch, roll } = ahrs.getEulerAngles();
	const headingDegrees = ((360+270-toDegrees(heading))%360).toFixed(2)
	const rollDegrees = ((toDegrees(roll)-90)%360).toFixed(2)

	const displayHeading = headingDegrees;
	const displayRoll = rollDegrees;  //front-back tilt (ios = android + 180)
	return (
		<View style={styles.indicator}>
		<Text>
		Heading: {displayHeading}°{'\n'}
		Roll: {displayRoll}°{'\n'}
		</Text>
		</View>
	);
};

ScannerScreen.navigationOptions = {
	title: 'Scan'
}

const mapStateToProps = state => {
	return state;
}

export default connect(
	mapStateToProps,
	{fetchLocation, updateCurrentLocation}
)(ScannerScreen);
