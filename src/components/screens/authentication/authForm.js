import React, { Component } from 'react';
import { Text, Input, Button } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { authFormStyles } from './styles';

class AuthForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false,
			message: '',
		};
	}

	updateState(key, value) {
		this.setState({...this.state, [key]: value});
	}

	render() {
		return (
			<View style={authFormStyles.container}>
				<View style={[authFormStyles.formSection, authFormStyles.center]}>
					<Text h1>Hawkeye</Text>
				</View>

				<View style={authFormStyles.formSection}>
					<View>
						<Input
							label="Email"
							placeholder="person@example.com"
							leftIcon={<Icon name="email" size={authFormStyles.iconSize} />}
							value={this.state.email}
							onChangeText={this.updateState.bind(this,'email')}
							errorMessage={this.props.emailError}/>
						<Input
							label="Password"
							placeholder="password"
							leftIcon={<Icon name="lock" size={authFormStyles.iconSize} />}
							secureTextEntry
							value={this.state.password}
							onChangeText={this.updateState.bind(this,'password')}
							errorMessage={this.props.passwordError} />
					</View>
					<Button
						loading={this.props.loading}
						style={authFormStyles.button}
						title={this.props.onSubmitText}
						onPress={()=>{this.props.onSubmitAction(this.state)}} />
				</View>

				<View style={authFormStyles.formSection}>
					<TouchableOpacity onPress={this.props.toggleAuthMode}>
						<Text style={[authFormStyles.alternateAuthText, authFormStyles.center]}>
							{this.props.alternateAuthText}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default AuthForm;
