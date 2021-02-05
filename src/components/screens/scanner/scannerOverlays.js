import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';

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

class ScannerOverlays extends Component {

	getReticleDisplay(deviations) {
		const { headingDeviation, pitchDeviation, combinedDeviation } = deviations;

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
			</>
		);
	};

	getTargetIconPositioning(deviations) {
		const { headingDeviation, pitchDeviation } = deviations;
		const { dimensions } = this.props;
		const cameraConfig = this.props.configuration.camera;

		const cameraDimensions = {
			cameraHeightAngle: cameraConfig.verticalAngleOfView,
			cameraWidthAngle: cameraConfig.horizontalAngleOfView,
		};
		if (dimensions.width !== 0 ) {
			const screenDimensions = { screenWidth: dimensions.width, screenHeight:  dimensions.height};
			const deviations = { headingDeviation, pitchDeviation };
			const targetPosition = getTargetPosition(screenDimensions, cameraDimensions, deviations);
			const positionStyle = {top: -targetPosition.y, left: targetPosition.x};
			return positionStyle;
		}
		return {top: 9999, left: 9999};
	}

	deviationsBannerDisplay(deviations) {
		const { headingDeviation, pitchDeviation } = deviations;

		return (
			<View style={styles.container}>
				<View style={styles.directionsDisplay}>
					<Text h5 style={styles.directionsText}>{strings.headingLabel}:  {headingDeviation}°</Text>
					<Text h5 style={styles.directionsText}>{strings.pitchLabel}:  {pitchDeviation}°</Text>
				</View>
			</View>
		);
	};

	targetMarkerIndicator(deviations, distance) {
		const targetPosition = this.getTargetIconPositioning(deviations);
		const targetDistancePosition = {top:targetPosition.top + 30, left: targetPosition.left};

		return (
			<>
				<View style={styles.reticleContainer}>
					<View style={[styles.targetIndicator, targetPosition]} />
				</View>
				<View style={styles.reticleContainer}>
					<Text style={[styles.targetDistanceIndicator, targetDistancePosition]}>
						{Math.round(distance)} m
					</Text>
				</View>
			</>
		);
	};

	render() {
		const { activeTarget } = this.props.targets;
		const myLocation = this.props.location.currentLocation;
		const targetLocation = this.props.location.targetLocations[activeTarget];

		if (!targetLocation || targetLocation === {} || myLocation === {}) {
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
		const deviations = getHeadingAndPitchDeviations(myLocation, targetLocation, this.props.currentOrientation);

		return (
			<>
				{this.getReticleDisplay(deviations)}
				{this.deviationsBannerDisplay(deviations)}
				{this.targetMarkerIndicator(deviations, distanceToTarget)}
			</>
		);
	}
}

const mapStateToProps = state => {
	return state;
}

export default connect(
	mapStateToProps,
)(ScannerOverlays);
