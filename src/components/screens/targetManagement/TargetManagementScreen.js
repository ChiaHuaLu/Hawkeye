import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, Input, Button } from 'react-native-elements';
import { addTarget, deleteTarget } from '../../../actions/TargetActions';
import { fetchLocation } from '../../../actions/LocationActions';
import styles from './styles';

class TargetManagementScreen extends Component {

	save() {
		if (this.props.edit)
			this.props.deleteTarget(this.props.edit.accessCode);
		this.props.addTarget(this.state.name, this.state.accessCode);
		Actions.pop();
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
			testConnection: false
		}
	}

	enableOrDisableSaveButton(key, value, show) {
		const nextState = {...this.state, [key]:value}
		const shouldShow = nextState.name && nextState.accessCode || show;
		this.props.navigation.setParams({
			'onRight': shouldShow ? this.save.bind(this) : undefined,
			'rightTitle': shouldShow ? 'Save' : undefined
		});
	}

	updateState(key, value) {
		this.enableOrDisableSaveButton(key, value);
		this.setState({...this.state, [key]: value});
	}

	componentWillMount() {
		const target = this.props.edit;
		if (target) {
			this.enableOrDisableSaveButton(null, null, true);
			this.setState({name: target.name, accessCode: target.accessCode})
		}
	}

	renderFormTitle() {
		const modifyMode = this.props.edit;
		const title = modifyMode ? "Edit Details" : "Add Target";

		return <Text h2>{title}</Text>
	}

	renderLastKnownPosition() {
		if (!this.state.testConnection)
			return null;

		const { accessCode } = this.props.edit ? this.props.edit : this.state;
		const lastLocation = this.props.location.targetLocations[accessCode];
		if (lastLocation ) {
			return <Text>{lastLocation.latitude}, {lastLocation.longitude}</Text>
		}
		return <Text>Unavailable</Text>
	}

	render() {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					{ this.renderFormTitle() }
					<Input
						onChangeText={this.updateState.bind(this, 'name')}
						value={this.state.name}
						label="Target Nickname" />
					<Input
						onChangeText={this.updateState.bind(this, 'accessCode')}
						value={this.state.accessCode}
						label="Access Code" />
					<Button
						title="Test Connection"
						containerStyle={styles.testButton}
						loading={this.props.location.loading}
						disabled={!this.state.accessCode || !this.state.name}
						onPress={()=>{this.testConnection()}}/>

					<Text>{this.renderLastKnownPosition()}</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return state;
}

export default connect(
	mapStateToProps,
	{ addTarget, fetchLocation, deleteTarget }
)(TargetManagementScreen);
