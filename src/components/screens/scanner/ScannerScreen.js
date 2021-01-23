import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import SensorFusionProvider, { useSensorFusion, toDegrees } from 'react-native-sensor-fusion';

import { fetchLocation, updateCurrentLocation } from '../../../actions/LocationActions';
import { bearingToTarget, groundDistanceMeters, elevationToTarget } from '../../../helpers/calculator';
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
		const groundDistance = groundDistanceMeters(myLocation, targetLocation);
		const bearing = bearingToTarget(myLocation, targetLocation);
		const elevationAngle = elevationToTarget(myLocation, targetLocation);
		return (<>
			<Text h5>Ground Distance To Target:{groundDistance}</Text>
			<Text h5>Heading To Target:{bearing}</Text>
			<Text h5>Elevation To Target:{elevationAngle}</Text>
			</>
		);
		// return null;

	}

	render() {
		return (
			<SafeAreaView>
				<Text>ScannerScreen</Text>
				{this.getDirectionsToTarget()}
				<SensorFusionProvider>
					<Indicator />
				</SensorFusionProvider>

			</SafeAreaView>
		);
	}
}




const Indicator = () => {

  const { ahrs } = useSensorFusion();
  const { heading, pitch, roll } = ahrs.getEulerAngles();
  const displayHeading = ((360+270-Math.round(toDegrees(heading))))%360;
  const displayRoll = (Math.round(toDegrees(roll))-90)%360;  //front-back tilt (ios = android + 180)
  return (
    <Text>
      Heading: {displayHeading}°{'\n'}
      Roll: {displayRoll}°{'\n'}
    </Text>
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
