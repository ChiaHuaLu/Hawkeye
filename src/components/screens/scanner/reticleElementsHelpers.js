import {
	bearingToTarget,
	directDistance,
	elevationToTarget,
	getHeadingDeviation,
	getPitchDeviation,
	radiansToDegrees,
} from '../../../helpers/calculator';
import styles from './styles';

export const getReticleStyles = (deviation) => {
	const reticleColor = getColorForDeviation(deviation)
	return {
		...styles.reticle,
		borderColor: reticleColor
	};
}

export const getArrowContainerStyles = (headingDeviation, pitchDeviation) => {
	const arrowRotationDegrees = getReticleArrowRotationAngle(headingDeviation, pitchDeviation);

	return {
		...styles.reticleArrowContainer,
		transform: [
			{rotate: `${arrowRotationDegrees}deg`}
		]
	};
}

export const getReticleArrowStyles = (deviation) => {
	const arrowColor = getColorForDeviation(deviation);
	const arrowSize = getArrowSizeForDeviation(deviation);

	return {
		...styles.reticleArrow,
		borderBottomColor: arrowColor,
		borderBottomWidth: arrowSize
	};
}

const getColorForDeviation = (combinedDeviation) => {
	const maxColorValue = 255;
	const maxAngleForGreen = 1;
	const maxAngleForColorshift = 90;
	if (combinedDeviation < maxAngleForGreen) {
		return 'green';
	}
	if (combinedDeviation < maxAngleForColorshift) {
		const rgbGreenValue = maxColorValue - ((combinedDeviation / maxAngleForColorshift) * maxColorValue);
		return `rgb(${maxColorValue}, ${rgbGreenValue}, 0)`;
	}
	return 'red';
}

const getArrowSizeForDeviation = (combinedDeviation) => {
	const minArrowSize = 3;
	const allowedDeviationForMinSize = 1;
	const maxArrowSize = 40;
	const allowedDeviationForDynamicSize = 90;
	if (combinedDeviation < allowedDeviationForMinSize) {
		return minArrowSize;
	}
	if (combinedDeviation < allowedDeviationForDynamicSize) {
		return minArrowSize + ((combinedDeviation / allowedDeviationForDynamicSize) * (maxArrowSize - minArrowSize))
	}
	return maxArrowSize;
}

export const getHeadingAndPitchDeviations = (myLocation, targetLocation, {ahrs}) => {
	const distanceToTarget = directDistance(myLocation, targetLocation);
	const headingToTarget = bearingToTarget(myLocation, targetLocation);
	const pitchToTarget = elevationToTarget(myLocation, targetLocation);

	const { heading, roll } = ahrs.getEulerAngles();
	const currentHeading = ((360+270-radiansToDegrees(heading))%360).toFixed(2);
	const currentPitch = ((radiansToDegrees(roll)-90)%360).toFixed(2); //front-back tilt (ios = android + 180)

	const headingDeviation = getHeadingDeviation(headingToTarget, currentHeading);
	const pitchDeviation = getPitchDeviation(pitchToTarget, currentPitch);
	const combinedDeviation = getCombinedDeviation(headingDeviation, pitchDeviation);

	return { headingDeviation, pitchDeviation, combinedDeviation };
}

const getReticleArrowRotationAngle = (headingDeviation, pitchDeviation) => {
	var unitHeading = headingDeviation / 180;
	var unitPitch = pitchDeviation / 90;
	var angle = radiansToDegrees(Math.atan(unitHeading/unitPitch));
	unitPitch < 0 ? angle += 180 : null

  	return Math.round(angle);
};

const getCombinedDeviation = (headingDeviation, pitchDeviation) => {
	const magnitude = Math.sqrt(headingDeviation ** 2 + pitchDeviation ** 2);

	return magnitude;
};
