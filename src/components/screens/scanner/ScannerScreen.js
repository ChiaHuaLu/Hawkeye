import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import SensorFusionProvider from 'react-native-sensor-fusion';
import { RNCamera } from 'react-native-camera';

import { fetchLocation, updateCurrentLocation } from '../../../actions/LocationActions';
import { getLocationInterval } from '../../../helpers/locationHelper';
import NavigationDisplay from './navigationDisplay'
import styles from './styles';


class ScannerScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			interval: null
		}
	}

	componentDidMount() {
		const getLocation = ((location) => {
			if (!this.props.navigation.isFocused()) {
				clearInterval(this.state.interval);
			}
			console.log("Scanner Get Location")
			this.props.updateCurrentLocation(location, this.props.location.accessCode)
			this.props.fetchLocation(this.props.targets.activeTarget)
		});

		const interval = getLocationInterval(getLocation, 3, 10);
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
	title: 'Scan'
}

const mapStateToProps = state => {
	return state;
}

export default connect(
	mapStateToProps,
	{fetchLocation, updateCurrentLocation}
)(ScannerScreen);
