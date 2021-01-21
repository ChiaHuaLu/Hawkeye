import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { signIn, register, clearError } from '../../../actions/AuthActions'
import AuthForm from './authForm';
import { styles } from './styles';


class AuthenticationScreen extends Component {

	constructor(props) {
		super(props);
		this.state={
			isRegisterMode:false,
		}
	}

	toggleAuthenticationMethod() {
		this.props.clearError();
		this.setState({isRegisterMode: !this.state.isRegisterMode});
	}

	authenticateUser({email, password}) {
		this.props.signIn(email, password);
	}

	registerUser({email, password}) {
		this.props.register(email, password);
	}

	getPropsForAuthForm() {
		const signInUI = {
			authText:'Log in',
			alternateAuthText:'Need to Register instead?',
			onSubmitAction:this.authenticateUser.bind(this),
			onSubmitText:'Log in'
		};

		const registerUI = {
			authText:'Registration',
			alternateAuthText:'Need to log in instead?',
			onSubmitAction:this.registerUser.bind(this),
			onSubmitText:'Register'
		};
		var props = this.state.isRegisterMode ? registerUI : signInUI;
		const { error } = this.props;

		if (error) {
			if (error.code === 'auth/invalid-email') {
				props.emailError = error.message
			} else {
				props.passwordError = error.message
			}
		}
		return props;
	}

	render() {
		const authFormProps = this.getPropsForAuthForm();

		return (
			<SafeAreaView style={styles.authScreenContainer}>
				<AuthForm
					style={styles.authForm}
					authText={authFormProps.authText}
					emailError={authFormProps.emailError}
					passwordError={authFormProps.passwordError}
					alternateAuthText={authFormProps.alternateAuthText}
					onSubmitAction={authFormProps.onSubmitAction}
					onSubmitText={authFormProps.onSubmitText}
					toggleAuthMode={this.toggleAuthenticationMethod.bind(this)}
					 />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return {error: state.auth.error};
}

export default connect(
	mapStateToProps,
	{signIn, register, clearError})
	(AuthenticationScreen);
