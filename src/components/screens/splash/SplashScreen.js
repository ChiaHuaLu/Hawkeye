import React, { Component } from 'react';
import { View, SafeAreaView, Image, Text as NativeText, Platform, Linking } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import SharedStyles from '../../../constants/sharedStyles';
import Hawkeye from '../../../assets/hawkeyeLogo/splashScreenLogo.png';
import strings from '../../../assets/strings/en';
import routeNames from '../../../constants/routeNames';
import { styles } from './styles';

const splashInterval = 2;

class SplashScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			shouldProceed: false,
		};
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this.handleOpenURL);
	}

	handleOpenURL = (event) => {
		this.navigate(event.url);
	}

	navigate = (url) => {
		const { navigate } = this.props.navigation;
		const route = url.replace(/.*?:\/\//g, '');
		const accessCode = route.match(/\/([^\/]+)\/?$/)[1];
		const routeName = route.split('/')[0];

		if (routeName === 'addTarget' && accessCode) {
			setTimeout(() => {
				Actions.push(routeNames.targetManagement, {edit: {accessCode}});
			}, splashInterval * 2 * 1000);
		};
	}


	componentDidMount() {
		setTimeout(() => {
			this.proceedToNextScreen();
		}, splashInterval * 1000);

		if (Platform.OS === 'android') {
			Linking.getInitialURL().then(url => {
				if (url) {
					this.navigate(url);
				}
			});
		} else {
			Linking.addEventListener('url', this.handleOpenURL);
		}
	}

	proceedToNextScreen() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				Actions.popTo(routeNames.splash);
				Actions[routeNames.mainFlow]();
			} else {
				Actions.popTo(routeNames.splash);
				Actions[routeNames.authentication]();
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
					title={strings.splashProceedButton} />
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
						<Text h1 style={styles.title}>{strings.appName}</Text>
						<NativeText
							style={styles.subtitle}
							fontStyle="italic">{strings.slogan}
						</NativeText>
					</View>
				</View>
				{this.renderProceedButton()}
			</SafeAreaView>
		);
	}
}
export default SplashScreen;
