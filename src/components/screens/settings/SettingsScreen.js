import React, { Component } from 'react';
import { View, SafeAreaView, Vibration } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Text, Input, Button } from 'react-native-elements';
import Communications from 'react-native-communications'
import styles from './styles';
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';




class SettingsScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			accessCode: 'jahdksfkjahl'
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
		    console.log(location);
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
		console.log(UNI);


	}

	componentWillMount() {
		Geolocation.requestAuthorization("whenInUse");
	}

	render() {
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
