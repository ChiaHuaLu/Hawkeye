import React, { Component } from 'react';
import { View, SafeAreaView, Image, Text as NativeText } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import SharedStyles from '../../../constants/sharedStyles';
import Hawkeye from '../../../assets/hawkeyeLogo/splashScreenLogo.png';
import { styles } from './styles';

const splashInterval = 2;

class SplashScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			shouldProceed: false,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.proceedToNextScreen();
		}, splashInterval * 1000);
	}

	proceedToNextScreen() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				Actions.popTo('splash');
				Actions.mainFlow();
			} else {
				Actions.popTo('splash');
				Actions.authentication();
			}
			setTimeout(() => {
				this.setState({shouldProceed: true});
			}, splashInterval * 1000);
		});
	}

	renderProceedButton() {
		if (!this.state.shouldProceed)
			return null;
		return (
			<View style={styles.proceedButtonContainer}>
				<Button
					buttonStyle={SharedStyles.buttonStyle}
					onPress={() => this.proceedToNextScreen()}
					title='Proceed' />
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView style={styles.splashContainer}>
				<View>
					<Image
			          style={styles.logo}
			          source={Hawkeye} />
					<View style={styles.textContainer}>
						<Text h1 style={styles.title}>Hawkeye</Text>
						<NativeText
							style={styles.subtitle}
							fontStyle="italic">Pinpoint Your Target
						</NativeText>
					</View>
				</View>
				{this.renderProceedButton()}
			</SafeAreaView>
		);
	}
}
export default SplashScreen;
