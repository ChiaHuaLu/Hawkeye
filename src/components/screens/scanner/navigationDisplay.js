import React, { useState } from 'react';
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
	getTargetPosition,
} from './reticleElementsHelpers';
import strings from '../../../assets/strings/localizedStrings';
import styles from './styles';

const NaivgationDisplay = ({location, targets, cameraConfig}) => {

	const [state, setState] = useState({width: 0, height: 0});
	const { activeTarget } = targets;
	const myLocation = location.currentLocation;
	const targetLocation = location.targetLocations[activeTarget];

	const getTargetIconPositioning = (headingDeviation, pitchDeviation) => {
		const cameraDimensions = {
			cameraHeightAngle: cameraConfig.verticalAngleOfView,
			cameraWidthAngle: cameraConfig.horizontalAngleOfView,
		};
		if (state.width !== 0) {
			const screenDimensions = { screenWidth: state.width, screenHeight:  state.height};
			const deviations = { headingDeviation, pitchDeviation };
			const targetPosition = getTargetPosition(screenDimensions, cameraDimensions, deviations);
			const positionStyle = {top: -targetPosition.y, left: targetPosition.x};
			return positionStyle;
		}
		return {top: 9999, left: 9999};
	}

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

	const targetPosition = getTargetIconPositioning(headingDeviation, pitchDeviation);
	const targetDistancePosition = {top:targetPosition.top+30, left: targetPosition.left};

	const deviationsBannerDisplay = () => {
		return (
			<View style={styles.container}>
				<View style={styles.directionsDisplay}>
					<Text h5 style={styles.directionsText}>{strings.headingLabel}:  {headingDeviation}°</Text>
					<Text h5 style={styles.directionsText}>{strings.pitchLabel}:  {pitchDeviation}°</Text>
				</View>
			</View>
		);
	};

	const targetMarkerIndicator = () => {
		return (
			<>
				<View style={styles.reticleContainer}
					onLayout={(event) => {
						var {width, height} = event.nativeEvent.layout;
						setState({width, height});
					}}>
					<View style={[styles.targetIndicator, targetPosition]} />
				</View>
				<View style={styles.reticleContainer}>
					<Text style={[styles.targetDistanceIndicator, targetDistancePosition]}>
						{Math.round(distanceToTarget)} m
					</Text>
				</View>
			</>
		);
	};

	const reticleDisplay = () => {
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
			</>
		);
	};

	return (
		<>
			{reticleDisplay()}
			{deviationsBannerDisplay()}
			{targetMarkerIndicator()}
		</>
	);
};

export default NaivgationDisplay;
