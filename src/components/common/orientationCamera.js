import React, { useState, useEffect } from 'react';
import { useSensorFusion } from 'react-native-sensor-fusion';
import { RNCamera } from 'react-native-camera';
import CompassHeading from 'react-native-compass-heading';

import {
	radiansToDegrees,
} from '../../helpers/calculator';
import styles from './cameraStyles';

// Must have SensorFusionProvider as ancestor
const OrientationCamera = ({children}) => {

	const [dimensions, setDimensions] = useState({width: 0, height: 0});
	const [compassHeading, setCompassHeading] = useState(0);
	useEffect(() => {
			const degree_update_rate = 0.01;
			CompassHeading.start(degree_update_rate, degree => {
			setCompassHeading(degree);
		});
		return () => {
			CompassHeading.stop();
		};
	}, []);

	const getCurrentOrientation = (compassHeading, precision = 2) => {
		const androidPitchCorrection = -90;
		const iosPitchCorrection = 90;
		const isAndroid = Platform.OS === 'android';

		const { heading, roll } = useSensorFusion().ahrs.getEulerAngles();

		// Compass Heading does not work accurately on Android, only on iOS.
		// FusionHeading does not work on iOS, only on Android
		const sensorFusionHeading = ((360 + 270 - radiansToDegrees(heading)) % 360);
		const currentHeading = isAndroid ? sensorFusionHeading : compassHeading;

		const platformPitchCorrection = isAndroid ? androidPitchCorrection : iosPitchCorrection;
		const currentPitch = ((radiansToDegrees(roll) + platformPitchCorrection) % 360);

		return {
			heading: currentHeading.toFixed(precision),
			pitch: currentPitch.toFixed(precision)
		};
	}

	const currentOrientation = getCurrentOrientation(compassHeading);
	const orientatedChildren = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { currentOrientation, dimensions });
		}
		return child;
	});

	return (
		<RNCamera
			autoFocus
			captureAudio={false}
			style={styles.cameraView}
			useNativeZoom={false}
			type={RNCamera.Constants.Type.back}
			onLayout={(event) => {
				var {width, height} = event.nativeEvent.layout;
				setDimensions({width, height});
			}}>
				{orientatedChildren}
		</RNCamera>
	);
};

export default OrientationCamera;
