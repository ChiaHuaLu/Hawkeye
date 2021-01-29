import React, { Component } from 'react';
import { View, SafeAreaView, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, Input, Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import strings from '../../../assets/strings/localizedStrings';
import routeNames from '../../../constants/routeNames';
import { fetchLocation } from '../../../actions/LocationActions';
import {
	addTarget,
	deleteTarget,
	toggleTrackTarget,
} from '../../../actions/TargetActions';
import { getTimeDifferenceText } from '../../../helpers/updateIntervalHelper';
import { ConfirmationBottomSheet } from '../../common/confirmationBottomSheet';
import styles from './styles';

class TargetManagementScreen extends Component {

	save() {
		if (this.props.edit) {
			this.props.deleteTarget(this.props.edit.accessCode);
			if (this.props.edit.accessCode !== this.state.accessCode) {
				this.props.toggleTrackTarget(this.state.accessCode);
			}
		}
		this.props.addTarget(this.state.name, this.state.accessCode);
		this.props.fetchLocation(this.state.accessCode);
		Actions.popTo(routeNames.targetList);
	}

	deleteThisTarget() {
		this.props.deleteTarget(this.props.edit.accessCode);
		Actions.pop();
	}

	testConnection() {
		const { accessCode } = this.props.edit ? this.props.edit : this.state;
		Keyboard.dismiss();
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
			showModal: false,
		}
	}

	enableOrDisableSaveButton(newValues) {
		const nextState = {...this.state, ...newValues};
		const shouldShow = nextState.name && nextState.accessCode;
		this.props.navigation.setParams({
			'onRight': shouldShow ? this.save.bind(this) : undefined,
			'rightTitle': shouldShow ? strings.saveButtonText : undefined,
		});
	}

	updateState(newValues) {
		this.enableOrDisableSaveButton(newValues);
		this.setState({...this.state, ...newValues, testConnection: false});
	}

	componentDidMount() {
		const target = this.props.edit;
		if (target) {
			this.setState({
				...this.state,
				name: target.name,
				accessCode: target.accessCode
			});
		}
	}

	renderFormTitle() {
		const modifyMode = this.props.edit;
		const title = modifyMode ? strings.editDetailsHeader : strings.addTargetHeader;

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
				<Text>( {lastLocation.latitude.toFixed(5)}, {lastLocation.longitude.toFixed(5)} )</Text>
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

	getTrackToggleButtonText() {
		const { activeTarget } = this.props.targets;
		var currentAccessCode = this.props.edit ? this.props.edit.accessCode : null;

		if (activeTarget === currentAccessCode)
			return strings.untrackButton;
		return strings.trackButton;
	}

	renderListManagementButtons() {
		if (!this.props.edit)
			return null;
		return (
			<View style={styles.listManagementButtonContainerView}>
				<Button
					container={[styles.listManagementButtonContainer]}
					buttonStyle={[styles.listManagementButton, styles.deleteButton]}
					title={strings.deleteButton}
					onPress={() => {
						this.setState({...this.state, showModal: true});
					}} />
				<Button
					container={[styles.listManagementButtonContainer]}
					buttonStyle={[styles.listManagementButton, styles.trackButton]}
					title={this.getTrackToggleButtonText()}
					onPress={() => {
						this.props.toggleTrack();
						Actions.pop();
					}} />
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					{ this.renderFormTitle() }
					<Input
						onChangeText={(newName) => {this.updateState({'name': newName})}}
						value={this.state.name}
						placeholder={strings.targetNicknamePlaceholder}
						label={strings.targetNicknameLabel} />
					<Input
						onChangeText={(newCode) => {this.updateState({'accessCode': newCode})}}
						value={this.state.accessCode}
						placeholder={strings.targetAccessCodePlaceholder}
						label={strings.targetAccessCodeLabel} />

					{ this.renderListManagementButtons() }

					<Button
						title={strings.testConnectionButton}
						containerStyle={styles.testButton}
						buttonStyle={SharedStyles.buttonStyle}
						loading={this.props.location.loading}
						disabled={!this.state.accessCode || !this.state.name || this.state.testConnection}
						onPress={()=>{this.testConnection()}}/>

					{this.renderLastKnownPosition()}
				</View>
				<ConfirmationBottomSheet
					visible={this.state.showModal}
					hideModal={() => {this.setState({...this.state, showModal: false})}}
					promptText={strings.deleteTargetConfirmationPrompt}
					confirmText={strings.deleteTargetConfirmationButton}
					onConfirm={this.deleteThisTarget.bind(this)}
					declineText={strings.cancelButton} />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	{ addTarget, fetchLocation, deleteTarget, toggleTrackTarget }
)(TargetManagementScreen);
