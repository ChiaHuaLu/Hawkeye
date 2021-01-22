import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';
import SensorFusionProvider, { useSensorFusion, useCompass, toDegrees } from 'react-native-sensor-fusion';

class ScannerScreen extends Component {

	render() {
		return (
			<SafeAreaView>
				<Text>ScannerScreen</Text>
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
  const displayHeading = 360-Math.round(toDegrees(heading))-90;
  const displayRoll = Math.round(toDegrees(roll))-90;  //front-back tilt (ios = android + 180)
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

export default ScannerScreen ;
