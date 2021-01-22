import React, { Component } from 'react';
import { View, SafeAreaView, Vibration } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Text, Input, Button } from 'react-native-elements';
import Communications from 'react-native-communications'
import styles from './styles';
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';

import { DeviceEventEmitter } from 'react-native';
import DeviceAngles from 'react-native-device-angles';

import SensorFusionProvider, { useSensorFusion, useCompass, toDegrees } from 'react-native-sensor-fusion';

const Indicator = () => {

  const { ahrs } = useSensorFusion();
  const { heading, pitch, roll } = ahrs.getEulerAngles();
  const { x, y, z, w } = ahrs.toVector();
  const compass = useCompass();
  const displayHeading = 360-Math.round(toDegrees(heading))-90;
  const displayRoll = Math.round(toDegrees(roll))-90;  //front-back tilt (ios = android + 180)
  const displayCompass = Math.round(toDegrees(compass)) % 360;
  return (<>
    <Text>
      Heading: {displayHeading}°{'\n'}
      Roll: {displayRoll}°{'\n'}
      Compass: {displayCompass}°{'\n'}

    </Text>
	<Text
      children={Math.round(toDegrees(z))}
    /></>
  );
};

class SettingsScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			accessCode: 'jahdksfkjahl',
			sensor: {
				heading: 0,
				pitch: 0,
				roll: 0,
				compass: 0
			}
		}
	}

	textAccessCode() {
		Communications.text(null, `My Hawkeye Access Code is ${this.state.accessCode}`);
	}

	copyToClipboard() {
		Vibration.vibrate(50);
		Clipboard.setString(this.state.accessCode);
	}

	getLocationOnce() {


		GetLocation.getCurrentPosition({
		    enableHighAccuracy: true,
		    timeout: 15000,
		})
		.then(location => {
			const { bearing, course } = location;

		    console.log("Heading: ", bearing, "   ", course);
		})
		.catch(error => {
		    const { code, message } = error;
		    console.warn(code, message);
		})


		// Geolocation.getCurrentPosition(
	    //     (position) => {
	    //       console.log(position);
	    //     },
	    //     (error) => {
	    //       // See error code charts below.
	    //       console.log(error.code, error.message);
	    //     },
	    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	    // );

	}

	toggleLocationSwitch() {
		this.getLocationOnce();
	}

	deleteLocationData() {
		// console.log("Checkpoint 1")
		// const { ahrs } = useSensorFusion();
		// console.log("Checkpoint 2")
		//   const { heading, pitch, roll } = ahrs.getEulerAngles();
		//   console.log("Checkpoint 3")
		//   const compass = useCompass();
		//   console.log("Checkpoint 4")
		//
		// 	  this.setState({...this.state, sensor:{
		// 		  heading:heading, pitch:pitch, roll:roll, compass:compass}})


	}

	componentWillMount() {
		Geolocation.requestAuthorization("whenInUse");
	}

	render() {
		const {heading, pitch, roll, compass} = this.state.sensor;
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<View style={styles.container}>
					<Text h3>My Access Code</Text>
					<Text h4 style={styles.accessCode}>{this.state.accessCode}</Text>

					<View style={styles.buttonsContainer}>
						<Button
							containerStyle={styles.accessCodeButtons}
							title="Text"
							onPress={this.textAccessCode.bind(this)}
							disabled={!this.state.accessCode} />
						<Button
						 	containerStyle={styles.accessCodeButtons}
							title="Copy"
							onPress={this.copyToClipboard.bind(this)}
							disabled={!this.state.accessCode} />
					</View>
					<View style={styles.middleContainer}>
						<Text h1>Broadcasting...</Text>
						<SensorFusionProvider>
						<Indicator />
						</SensorFusionProvider>
					</View>
					<View style={styles.locationButtonsContainer}>
						<Button
							containerStyle={styles.locationButtons}
							title="Start Sharing Location"
							onPress={this.toggleLocationSwitch.bind(this)} />
						<Button
							containerStyle={styles.locationButtons}
							title="Delete Location Data"
							onPress={this.deleteLocationData.bind(this)} />
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

SettingsScreen.navigationOptions = {
	title: 'Settings  ',
}

export default SettingsScreen;
