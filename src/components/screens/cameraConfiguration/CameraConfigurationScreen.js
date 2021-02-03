import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, SafeAreaView } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import HorizontalAngleOfViewDiagram from '../../../assets/instructionalDiagrams/horizontalAngleOfView.png';
import VerticalAngleOfViewDiagram from '../../../assets/instructionalDiagrams/verticalAngleOfView.png';
import { setCameraAngleOfView, resetCameraAngleOfView } from '../../../actions/ConfigurationActions';
import strings from '../../../assets/strings/localizedStrings';
import styles from './styles';

class CameraConfigurationScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			horizontalAngleOfView: props.configuration.camera.horizontalAngleOfView,
			verticalAngleOfView: props.configuration.camera.verticalAngleOfView,
		}
	}

	render() {
		return (
			<SafeAreaView>
				<Text style={styles.instruction}>{strings.cameraConfigInstruction1}</Text>
				<Text style={styles.instruction}>{strings.cameraConfigInstruction2}</Text>
				<View style={styles.contentContainer}>
					<View style={styles.cameraAngleConfigContainer}>
						<Text h3 style={styles.angleName}>{strings.cameraAngleHorizontalSectionLabel}</Text>
						<Image style={styles.angleDiagram} source={HorizontalAngleOfViewDiagram} />
						<Input
							label={strings.cameraHorizontalAngleInputLabel}
							placeholder={"40"}
							value={`${this.state.horizontalAngleOfView}`}
							keyboardType="decimal-pad"
							onChangeText={(newValue) => {
								this.setState({...this.state, horizontalAngleOfView: newValue});
							}}/>
					</View>
					<View style={styles.cameraAngleConfigContainer}>
						<Text h3 style={styles.angleName}>{strings.cameraAngleVerticalSectionLabel}</Text>
						<Image style={styles.angleDiagram} source={VerticalAngleOfViewDiagram} />
						<Input
							label={strings.cameraVerticalAngleInputLabel}
							placeholder={"55"}
							value={`${this.state.verticalAngleOfView}`}
							keyboardType="decimal-pad"
							onChangeText={(newValue) => {
								this.setState({...this.state, verticalAngleOfView: newValue});
							}}/>
					</View>
				</View>
				<View style={styles.buttonsContainer}>
					<Button
						buttonStyle={styles.buttonStyle}
						onPress={() => {
							this.props.resetCameraAngleOfView();
							this.setState({...this.props.configuration.camera})
						}}
					 	title={strings.resetButtonText}/>
					<Button
						buttonStyle={styles.buttonStyle}
						onPress={() => {
							this.props.setCameraAngleOfView({
								horizontalAngleOfView: this.state.horizontalAngleOfView,
								verticalAngleOfView: this.state.verticalAngleOfView,
							});
							Actions.pop();
						}}
					 	title={strings.saveButtonText}/>
				</View>
			</SafeAreaView>
		);
	}
}

CameraConfigurationScreen.navigationOptions = {
	title: strings.cameraConfigurationScreenTitle,
	...SharedStyles.headerStyle,
};

const mapStateToProps = (state) => {
	return state;
}
export default connect(
	mapStateToProps,
	{setCameraAngleOfView, resetCameraAngleOfView}
)(CameraConfigurationScreen);
