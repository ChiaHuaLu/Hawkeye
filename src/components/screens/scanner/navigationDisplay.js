import React from 'react';
import { useSensorFusion, toDegrees } from 'react-native-sensor-fusion';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import styles from './styles';
import {
	bearingToTarget,
	directDistance,
	elevationToTarget,
	getHeadingCorrection,
	getPitchCorrection,
	getCorrectionArrowAngle,
} from '../../../helpers/calculator';

const NaivgationDisplay = ({location, targets}) => {

	const { activeTarget } = targets;
	if (activeTarget === '') {
		return (
			<View style={styles.container}>
			<View style={styles.directionsDisplay}>
				<Text h3>No Active Target</Text>
			</View></View>
		);
	}

	const targetLocation = location.targetLocations[activeTarget];
	if (targetLocation === null ) {
		return (
			<View style={styles.container}>
			<View style={styles.directionsDisplay}>
				<Text h3>Target Unavailable</Text>
			</View></View>
		);
	}

	const myLocation = location.currentLocation;

	const distanceToTarget = directDistance(myLocation, targetLocation);
	const headingToTarget = bearingToTarget(myLocation, targetLocation);
	const pitchToTarget = elevationToTarget(myLocation, targetLocation);

	const { ahrs } = useSensorFusion();
	const { heading, roll } = ahrs.getEulerAngles();
	const currentHeading = ((360+270-toDegrees(heading))%360).toFixed(2);
	const currentPitch = ((toDegrees(roll)-90)%360).toFixed(2); //front-back tilt (ios = android + 180)

	const headingCorrection = getHeadingCorrection(headingToTarget, currentHeading);
	const pitchCorrection = getPitchCorrection(pitchToTarget, currentPitch);
	const arrowDegree = getCorrectionArrowAngle(headingCorrection, pitchCorrection);
	return (
		<>
			<View style={styles.reticleContainer}>
				<View style={styles.reticle}></View>
			</View>
			<View style={styles.reticleContainer}>
				<View style={[styles.reticleArrowContainer, {transform: [{rotate: `${arrowDegree}deg`}]}]}>
					<View style={styles.reticleArrow}></View>
				</View>
			</View>

			<View style={styles.container}>
				<View style={styles.directionsDisplay}>
					<Text h5>Direct Distance To Target:{distanceToTarget} m</Text>
					<Text h5>Relative Target Direction: {headingCorrection}°</Text>
					<Text h5>Relative Target Pitch: {pitchCorrection}°</Text>
				</View>

			</View>
		</>
	);
};

export default NaivgationDisplay;
