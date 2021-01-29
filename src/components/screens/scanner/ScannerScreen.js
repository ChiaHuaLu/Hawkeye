import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SensorFusionProvider from 'react-native-sensor-fusion';
import { RNCamera } from 'react-native-camera';

import {
	fetchLocation,
	updateCurrentLocation,
} from '../../../actions/LocationActions';
import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import strings from '../../../assets/strings/localizedStrings';
import { runIntervalIfConditionMet } from '../../../helpers/locationHelper';
import NavigationDisplay from './navigationDisplay'
import { ScannerTabIcon } from '../../icons';
import styles from './styles';

class ScannerScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			interval: null
		};
	}

	componentDidMount() {
		const processLocation = ((location) => {
			if (this.props.navigation.isFocused()) {
				console.log("Scanner Get Location");
				this.props.updateCurrentLocation(location, this.props.location.accessCode);
				this.props.fetchLocation(this.props.targets.activeTarget);
			}
		});

		const processLocationCondition = () => {
			const condition = this.props.navigation.isFocused()
				&& this.props.targets.activeTarget !== '';
			return condition;
		}

		const interval = runIntervalIfConditionMet(processLocation,
			Constants.locationUpdateIntervalSeconds,
			Constants.locationUpdateIntervalSeconds,
			processLocationCondition);

		this.setState({...this.state, interval});
	}

	componentWillUnmount() {
		if (this.state.interval)
			clearInterval(this.state.interval);
	}

	render() {
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<RNCamera
					autoFocus
					captureAudio={false}
					style={styles.cameraView}
					useNativeZoom={false}
					type={RNCamera.Constants.Type.back}>
						<SensorFusionProvider>
							<NavigationDisplay
							 	targets={this.props.targets}
								location={this.props.location} />
						</SensorFusionProvider>
				</RNCamera>
			</SafeAreaView>
		);
	}
}

ScannerScreen.navigationOptions = {
	title: strings.scannerScreenTitle,
	tabBarIcon: () => (
		<ScannerTabIcon />
    ),
	...SharedStyles.headerStyle,
};

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	{fetchLocation, updateCurrentLocation}
)(ScannerScreen);
