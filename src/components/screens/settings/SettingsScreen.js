import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Text, Input, Button } from 'react-native-elements';
import Communications from 'react-native-communications'
import styles from './styles';

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
		Clipboard.setString(this.state.accessCode);
	}

	toggleLocationSwitch() {

	}

	deleteLocationData() {

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
							title="Stop Sharing Location"
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
