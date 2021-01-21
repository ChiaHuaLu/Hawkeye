import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';

class SettingsScreen extends Component {

	render() {
		return (
			<SafeAreaView>
				<Text>SettingsScreen</Text>
			</SafeAreaView>
		);
	}
}

SettingsScreen.navigationOptions = {
	title: 'Settings',
}

export { SettingsScreen };
