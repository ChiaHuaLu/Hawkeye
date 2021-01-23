import React from 'react';
import { useSensorFusion, toDegrees } from 'react-native-sensor-fusion';
import { Text } from 'react-native-elements';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';
import { bearingToTarget, directDistance, elevationToTarget } from '../../../helpers/calculator';

const NaivgationDisplay = ({location, targets}) => {

	const getDirectionsToTarget = () => {
		const { activeTarget } = targets;
		if (activeTarget === '') {
			return (
				<View style={styles.directionsDisplay}>
					<Text h3>No Active Target</Text>
				</View>
			);
		}
		const targetLocation = location.targetLocations[activeTarget];
		if (targetLocation === null ) {
			return (
				<View style={styles.directionsDisplay}>
					<Text h3>Target Unavailable</Text>
				</View>
			);
		}
		const myLocation = location.currentLocation;

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

	const { ahrs } = useSensorFusion();
	const { heading, pitch, roll } = ahrs.getEulerAngles();
	const headingDegrees = ((360+270-toDegrees(heading))%360).toFixed(2);
	const rollDegrees = ((toDegrees(roll)-90)%360).toFixed(2);

	const displayHeading = headingDegrees;
	const displayRoll = rollDegrees;  //front-back tilt (ios = android + 180)
	return (
		<View style={styles.container}>
			{getDirectionsToTarget()}
				<View style={styles.indicator}>
			<Text>
			Heading: {displayHeading}°{'\n'}
			Roll: {displayRoll}°{'\n'}
			</Text>
			</View>
		</View>
	);
};

export default NaivgationDisplay;
