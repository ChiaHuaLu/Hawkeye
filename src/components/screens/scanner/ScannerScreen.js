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
import { getLocationInterval } from '../../../helpers/locationHelper';
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
		const getLocation = ((location) => {
			if (!this.props.navigation.isFocused()) {
				clearInterval(this.state.interval);
			} else {
				console.log("Scanner Get Location");
				this.props.updateCurrentLocation(location, this.props.location.accessCode);
				this.props.fetchLocation(this.props.targets.activeTarget);
			}
		});

		const interval = getLocationInterval(getLocation,
			Constants.locationUpdateIntervalSeconds,
			Constants.locationUpdateIntervalSeconds);
		this.setState({...this.state, interval});
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
	title: 'Scan',
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
