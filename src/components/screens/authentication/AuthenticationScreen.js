import React, { Component } from 'react';
import { SafeAreaView, Vibration } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import {
	signIn,
	register,
	clearError,
	dispatchLoadingAction,
} from '../../../actions/AuthActions';
import strings from '../../../assets/strings/localizedStrings';
import Constants from '../../../constants/constants';
import AuthForm from './authForm';
import { styles } from './styles';

class AuthenticationScreen extends Component {

	constructor(props) {
		super(props);
		this.state={
			isRegisterMode:false,
			loading: false,
		};
		this.props.clearError();
	}

	toggleAuthenticationMethod() {
		this.props.clearError();
		this.setState({isRegisterMode: !this.state.isRegisterMode});
	}

	authenticateUser({email, password}) {
		this.props.dispatchLoadingAction();
		this.props.signIn(email, password);
	}

	registerUser({email, password}) {
		this.props.dispatchLoadingAction();
		this.props.register(email, password);
	}

	getPropsForAuthForm() {
		const signInUI = {
			authText: strings.signInHeader,
			alternateAuthText: strings.goToRegister,
			onSubmitAction: this.authenticateUser.bind(this),
			onSubmitText: strings.signInButton
		};

		const registerUI = {
			authText: strings.registerHeader,
			alternateAuthText: strings.goToSignIn,
			onSubmitAction:this.registerUser.bind(this),
			onSubmitText: strings.registerButton
		};

		var props = this.state.isRegisterMode ? registerUI : signInUI;
		const { error } = this.props.auth;

		if (error && Object.keys(error).length !== 0) {
			Vibration.vibrate(500);
			if (error.code === Constants.authenticationEmailErrorCode) {
				props.emailError = error.message;
			} else {
				props.passwordError = error.message;
			}
		}
		return props;
	}

	render() {
		const authFormProps = this.getPropsForAuthForm();

		return (
			<SafeAreaView style={styles.authScreenContainer}>
				<AuthForm
					loading={this.props.auth.loading}
					style={styles.authForm}
					authText={authFormProps.authText}
					emailError={authFormProps.emailError}
					passwordError={authFormProps.passwordError}
					alternateAuthText={authFormProps.alternateAuthText}
					onSubmitAction={authFormProps.onSubmitAction}
					onSubmitText={authFormProps.onSubmitText}
					toggleAuthMode={this.toggleAuthenticationMethod.bind(this)} />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	{signIn, register, clearError, dispatchLoadingAction})
	(AuthenticationScreen);
