import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';

class ScannerScreen extends Component {

	render() {
		return (
			<SafeAreaView>
				<Text>ScannerScreen</Text>
			</SafeAreaView>
		);
	}
}

ScannerScreen.navigationOptions = {
	title: 'Scan'
}

export { ScannerScreen };
