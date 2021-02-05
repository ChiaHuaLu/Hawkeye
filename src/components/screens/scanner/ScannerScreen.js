import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import SensorFusionProvider from 'react-native-sensor-fusion';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import {
	fetchLocation,
	updateCurrentLocation,
} from '../../../actions/LocationActions';
import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import strings from '../../../assets/strings/localizedStrings';
import { runIntervalIfConditionMet } from '../../../helpers/locationHelper';
import ScannerOverlays from './scannerOverlays'
import { ScannerTabIcon } from '../../icons';
import OrientationCamera from '../../common/orientationCamera';
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
				<SensorFusionProvider>
					<OrientationCamera>
						<ScannerOverlays />
					</OrientationCamera>
				</SensorFusionProvider>
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
	headerRight: () => (
		<TouchableOpacity
			onPress={()=>{
				Actions[routeNames.cameraConfiguration]();
			}}>
			<View style={styles.signOutButton}>
				<Icon
					name="options-outline"
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
	{fetchLocation, updateCurrentLocation}
)(ScannerScreen);
