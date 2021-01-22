import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, Vibration } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import Communications from 'react-native-communications';
import GetLocation from 'react-native-get-location';
import { updateLocation, deleteLocation } from '../../../actions/LocationActions';
import styles from './styles';


const locationUpdateIntervalSeconds = 10;

class SettingsScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			broadcasting: false,
			loading: false
		}
	}

	textAccessCode() {
		Communications.text(null, `My Hawkeye Access Code is ${this.props.location.accessCode}`);
	}

	copyToClipboard() {
		Vibration.vibrate(50);
		Clipboard.setString(this.props.location.accessCode);
	}

	getLocationOnce() {
		GetLocation.getCurrentPosition({
		    enableHighAccuracy: true,
		    timeout: locationUpdateIntervalSeconds * 1000,
		})
		.then(location => {
			const { altitude, latitude, longitude, time } = location;
			console.log("Updating location", this.props.location.accessCode, ", " , location)
			this.props.updateLocation({altitude, latitude,longitude, time}, this.props.location.accessCode)
			this.setState({...this.state, loading: false})
		})
	}

	startRecordingLocation() {
		this.getLocationOnce();
		const interval = setInterval((instance) => {
			instance.getLocationOnce()
		}, locationUpdateIntervalSeconds * 1000, this);
		this.setState({...this.state, interval: interval, broadcasting: true, loading: true});
	}

	stopRecordingLocation() {
		clearInterval(this.state.interval);
		this.setState({...this.state, interval: null, broadcasting: false, loading: false});
	}

	toggleLocationSwitch() {
		console.log("Button Press")
		const isCurrentlyRecording = this.state.broadcasting;
		if (isCurrentlyRecording) {
			this.stopRecordingLocation();
		} else {
			this.startRecordingLocation();
		}
	}

	getRecordingButtonText() {
		if (this.state.broadcasting)
			return "Stop Broadcasting";
		return "Start Sharing Location";
	}

	deleteLocationData() {
		this.props.deleteLocation(this.props.location.accessCode)
	}

	shouldDisableDeleteButton() {
		if (this.state.broadcasting || !this.props.location.accessCode)
			return true;
		return false;
	}

	// componentWillMount() {
	// 	// Geolocation.requestAuthorization("whenInUse");
	// }

	render() {
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<View style={styles.container}>
					<Text h3>My Access Code</Text>
					<Text h4 style={styles.accessCode}>{this.props.location.accessCode}</Text>

					<View style={styles.buttonsContainer}>
						<Button
							containerStyle={styles.accessCodeButtons}
							title="Text"
							onPress={this.textAccessCode.bind(this)}
							disabled={!this.props.location.accessCode} />
						<Button
						 	containerStyle={styles.accessCodeButtons}
							title="Copy"
							onPress={this.copyToClipboard.bind(this)}
							disabled={!this.props.location.accessCode} />
					</View>
					<View style={styles.middleContainer}>
						{ this.state.broadcasting
							? <Text h1>Broadcasting...</Text>
							: null
						}


					</View>
					<View style={styles.locationButtonsContainer}>
						<Button
							containerStyle={styles.locationButtons}
							title={this.getRecordingButtonText()}
							onPress={this.toggleLocationSwitch.bind(this)}
							loading={this.state.loading}
							/>
						<Button
							containerStyle={styles.locationButtons}
							title="Delete Location Data"
							onPress={this.deleteLocationData.bind(this)}
							disabled={this.shouldDisableDeleteButton()}
							/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

SettingsScreen.navigationOptions = {
	title: 'Settings  ',
}

const mapStateToProps = state => {
	return state
}

export default connect(
	mapStateToProps,
	{updateLocation, deleteLocation})
	(SettingsScreen);
