import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
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
		this.setState({isRegisterMode: !this.state.isRegisterMode});
	}

	authenticateUser({email, password}) {
		console.log("Sign in with:", email, password)
	}

	registerUser({email, password}) {
		console.log("Sign up with:", email, password)
	}

	getPropsForAuthForm() {
		const signInUI = {
			authText:"Log in",
			alternateAuthText:"Need to Register instead?",
			onSubmitAction:this.authenticateUser.bind(this),
			onSubmitText:"Log in"
		};

		const registerUI = {
			authText:"Registration",
			alternateAuthText:"Need to log in instead?",
			onSubmitAction:this.registerUser.bind(this),
			onSubmitText:"Register"
		};
		const props = this.state.isRegisterMode ? registerUI : signInUI;

		return props;
	}

	render() {
		const authFormProps = this.getPropsForAuthForm();

		return (
			<SafeAreaView style={styles.authScreenContainer}>
				<AuthForm
					style={styles.authForm}
					authText={authFormProps.authText}
					alternateAuthText={authFormProps.alternateAuthText}
					onSubmitAction={authFormProps.onSubmitAction}
					onSubmitText={authFormProps.onSubmitText}
					toggleAuthMode={this.toggleAuthenticationMethod.bind(this)}
					 />
			</SafeAreaView>
		);
	}
}

export { AuthenticationScreen };
