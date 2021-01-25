import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, Input, Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import { fetchLocation } from '../../../actions/LocationActions';
import { addTarget, deleteTarget } from '../../../actions/TargetActions';
import { getTimeDifferenceText } from '../../../helpers/updateIntervalHelper';
import styles from './styles';

class TargetManagementScreen extends Component {

	save() {
		if (this.props.edit)
			this.props.deleteTarget(this.props.edit.accessCode);
		this.props.addTarget(this.state.name, this.state.accessCode);
		this.props.fetchLocation(this.state.accessCode);
		Actions.popTo('targetList');
	}

	testConnection() {
		const { accessCode } = this.props.edit ? this.props.edit : this.state;
		this.props.fetchLocation(accessCode);
		this.setState({...this.state, testConnection: true});
	}

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			accessCode: '',
			testMessage: '',
			testConnection: false,
		}
	}

	enableOrDisableSaveButton(key, value, show) {
		const nextState = {...this.state, [key]:value}
		const shouldShow = nextState.name && nextState.accessCode || show;
		this.props.navigation.setParams({
			'onRight': shouldShow ? this.save.bind(this) : undefined,
			'rightTitle': shouldShow ? 'Save' : undefined,
		});
	}

	updateState(key, value) {
		this.enableOrDisableSaveButton(key, value);
		this.setState({...this.state, [key]: value, testConnection: false});
	}

	componentDidMount() {
		const target = this.props.edit;
		if (target) {
			this.enableOrDisableSaveButton(null, null, true);
			this.setState({name: target.name, accessCode: target.accessCode});
		}
	}

	renderFormTitle() {
		const modifyMode = this.props.edit;
		const title = modifyMode ? "Edit Details" : "Add Target";

		return <Text h2>{title}</Text>;
	}

	delta(last, current) {
		return Math.abs(last - current);
	}

	renderLastKnownPosition() {
		if (!this.state.testConnection)
			return null;

		const { location } = this.props;
		const { accessCode } = this.props.edit ? this.props.edit : this.state;
		const lastLocation = location.targetLocations[accessCode];
		var currentLocation = location.currentLocation;
		if (!currentLocation.latitude)
			currentLocation = lastLocation;

		if (lastLocation && lastLocation.latitude ) {
			const differenceInSeconds = Math.round((Date.now() - lastLocation.time) / 1000);
			return (
				<View style={styles.testView}>
				<Text>{lastLocation.latitude}, {lastLocation.longitude}</Text>
				<Text>Last updated {getTimeDifferenceText(differenceInSeconds)}</Text>
				<MapView
					style={styles.map}
					showsUserLocation
					initialRegion={{
						latitude: ( lastLocation.latitude + currentLocation.latitude ) / 2,
						longitude: ( lastLocation.longitude + currentLocation.longitude ) / 2,
						latitudeDelta: 1.5* (this.delta(lastLocation.latitude, currentLocation.latitude)) + 0.005,
						longitudeDelta: 1.5* (this.delta(lastLocation.longitude, currentLocation.longitude)) + 0.005
					}} >
						<Marker
						  coordinate={{
							  latitude: lastLocation.latitude,
							  longitude : lastLocation.longitude
						  }}
						  pinColor={'red'}
						/>
				</MapView>
				</View>
			);
		}
		return <Text>Unavailable</Text>;
	}

	render() {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					{ this.renderFormTitle() }
					<Input
						onChangeText={this.updateState.bind(this, 'name')}
						value={this.state.name}
						placeholder="Dad"
						label="Target Nickname" />
					<Input
						onChangeText={this.updateState.bind(this, 'accessCode')}
						value={this.state.accessCode}
						placeholder="-AwBxCyDz"
						label="Access Code" />
					<Button
						title="Test Connection"
						containerStyle={styles.testButton}
						buttonStyle={SharedStyles.buttonStyle}
						loading={this.props.location.loading}
						disabled={!this.state.accessCode || !this.state.name || this.state.testConnection}
						onPress={()=>{this.testConnection()}}/>

					{this.renderLastKnownPosition()}
				</View>
			</SafeAreaView>
		);
	}
}

TargetManagementScreen.navigationOptions = {
	title: 'Target List',
	...SharedStyles.headerStyle
};

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	{ addTarget, fetchLocation, deleteTarget }
)(TargetManagementScreen);
