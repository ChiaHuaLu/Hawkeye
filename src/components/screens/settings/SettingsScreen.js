import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, Vibration, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

import {
	uploadCurrentLocation,
	deleteLocation,
 } from '../../../actions/LocationActions';
import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import { runIntervalIfConditionMet } from '../../../helpers/locationHelper';
import { SettingsTabIcon } from '../../icons';
import styles from './styles';

class SettingsScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			broadcasting: false,
			loading: false
		};
	}

	textAccessCode() {
		Communications.text(null, `My Hawkeye Access Code is ${this.props.location.accessCode}`);
	}

	copyToClipboard() {
		Vibration.vibrate(50);
		Clipboard.setString(this.props.location.accessCode);
	}

	startRecordingLocation() {
		const uploadUpdatedLocation = ((location) => {
			const { altitude, latitude, longitude, time } = location;
			const { accessCode } = this.props.location;

			this.props.uploadCurrentLocation(location, accessCode);
			this.setState({...this.state, loading: false});
		});
		const interval = runIntervalIfConditionMet(uploadUpdatedLocation,
			Constants.locationUpdateIntervalSeconds,
			Constants.locationUpdateIntervalSeconds,
			this.props.navigation.isFocused);
		this.setState({...this.state, interval: interval, broadcasting: true, loading: true});
	}

	stopRecordingLocation() {
		clearInterval(this.state.interval);
		this.setState({...this.state, interval: null, broadcasting: false, loading: false});
	}

	toggleLocationSwitch() {
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

	render() {
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<View style={styles.container}>
					<Text h3>My Access Code</Text>
					<Text h4 style={styles.accessCode}>{this.props.location.accessCode}</Text>

					<View style={styles.buttonsContainer}>
						<Button
							containerStyle={styles.accessCodeButtons}
							buttonStyle={SharedStyles.buttonStyle}
							title="Text"
							onPress={this.textAccessCode.bind(this)}
							disabled={!this.props.location.accessCode} />
						<Button
						 	containerStyle={styles.accessCodeButtons}
							buttonStyle={SharedStyles.buttonStyle}
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
							buttonStyle={SharedStyles.buttonStyle}
							title={this.getRecordingButtonText()}
							onPress={this.toggleLocationSwitch.bind(this)}
							loading={this.state.loading}
							/>
						<Button
							containerStyle={styles.locationButtons}
							buttonStyle={styles.deleteButton}
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
	tabBarIcon: () => (
		<SettingsTabIcon />
    ),
	...SharedStyles.headerStyle,
	headerRight: () => (
		<TouchableOpacity
			onPress={()=>{
				firebase.auth().signOut();
			}}>
			<View style={styles.signOutButton}>
	            <Icon
					name="log-out-outline"
	              	size={Constants.navigationIconSize}
					color={Constants.primaryThemeColor} />
			</View>
		</TouchableOpacity>
          ),
};

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	{uploadCurrentLocation, deleteLocation})
	(SettingsScreen);
