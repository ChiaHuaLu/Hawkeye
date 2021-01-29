import React from 'react';
import { useSensorFusion, toDegrees } from 'react-native-sensor-fusion';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import {
	directDistance,
} from '../../../helpers/calculator';
import {
	getHeadingAndPitchDeviations,
	getReticleStyles,
	getArrowContainerStyles,
	getReticleArrowStyles,
} from './reticleElementsHelpers';
import strings from '../../../assets/strings/en';
import styles from './styles';

const NaivgationDisplay = ({location, targets}) => {

	const { activeTarget } = targets;
	const myLocation = location.currentLocation;
	const targetLocation = location.targetLocations[activeTarget];

	if (!targetLocation || targetLocation === {}) {
		const notSelectedText = strings.noTargetSelectedMessage;
		const notAvailableText = strings.targetUnavailableMessage;
		return (
			<View style={styles.container}>
			<View style={styles.directionsDisplay}>
				<Text h3>{activeTarget ? notAvailableText : notSelectedText}</Text>
			</View></View>
		);
	}

	const distanceToTarget = directDistance(myLocation, targetLocation);
	const { headingDeviation, pitchDeviation, combinedDeviation } =
		getHeadingAndPitchDeviations(myLocation, targetLocation, useSensorFusion());

	const reticleStyles = getReticleStyles(combinedDeviation);
	const arrowContainerStyles = getArrowContainerStyles(headingDeviation, pitchDeviation);
	const arrowStyles = getReticleArrowStyles(combinedDeviation);

	return (
		<>
			<View style={styles.reticleContainer}>
				<View style={reticleStyles}></View>
			</View>
			<View style={styles.reticleContainer}>
				<View style={arrowContainerStyles}>
					<View style={arrowStyles}></View>
				</View>
			</View>

			<View style={styles.container}>
				<View style={styles.directionsDisplay}>
					<Text h5 style={styles.directionsText}>{strings.distanceLabel}:  {distanceToTarget} m</Text>
					<Text h5 style={styles.directionsText}>{strings.headingLabel}:  {headingDeviation}°</Text>
					<Text h5 style={styles.directionsText}>{strings.pitchLabel}:  {pitchDeviation}°</Text>
				</View>
			</View>
		</>
	);
};

export default NaivgationDisplay;
