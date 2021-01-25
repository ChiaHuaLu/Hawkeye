import React from 'react';
import { useSensorFusion, toDegrees } from 'react-native-sensor-fusion';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import {
	bearingToTarget,
	directDistance,
	elevationToTarget,
	getHeadingCorrection,
	getPitchCorrection,
	getCorrectionArrowAngle,
	getCorrectionMagnitude,
} from '../../../helpers/calculator';
import styles from './styles';

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

	const getReticleColor = (headingCorrection, pitchCorrection) => {
		const correctionMagnitude = getCorrectionMagnitude(headingCorrection, pitchCorrection);
		const maxApproxAngle = 30;
		if (correctionMagnitude < 1) {
			return 'green';
		}
		if (correctionMagnitude < maxApproxAngle) {
			return `rgb(255, ${255 - (correctionMagnitude / 20 * 255)}, 0)`
		}
		return 'red';
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

	const reticleElementsColor = getReticleColor(headingCorrection, pitchCorrection);
	const reticleColor = {borderColor: reticleElementsColor};
	const reticleArrowColor = {borderBottomColor: reticleElementsColor};

	return (
		<>
			<View style={styles.reticleContainer}>
				<View style={[styles.reticle, reticleColor]}></View>
			</View>
			<View style={styles.reticleContainer}>
				<View style={[styles.reticleArrowContainer, {transform: [{rotate: `${arrowDegree}deg`}]}]}>
					<View style={[styles.reticleArrow, reticleArrowColor]}></View>
				</View>
			</View>

			<View style={styles.container}>
				<View style={styles.directionsDisplay}>
					<Text h5 style={styles.directionsText}>Distance:  {distanceToTarget} m</Text>
					<Text h5 style={styles.directionsText}>Heading:  {headingCorrection}°</Text>
					<Text h5 style={styles.directionsText}>Pitch:  {pitchCorrection}°</Text>
				</View>

			</View>
		</>
	);
};

export default NaivgationDisplay;
