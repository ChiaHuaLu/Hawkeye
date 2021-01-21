import React, { Component } from 'react';
import { Card, Text, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class TargetListItem extends Component {
	constructor(props) {
		super(props);

	}

	goToTargetManagement() {
		Actions.targetManagement({edit: this.props});
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.goToTargetManagement.bind(this)}>
					<View style={styles.listItem}>
						<Text style={[styles.itemDescription, styles.itemDetails]}>{this.props.name}</Text>
						<Text style={[styles.itemAccessCode, styles.itemStatus]}>{this.props.status}</Text>
					</View>
					<Divider />
				</TouchableOpacity>
			</View>
		);
	};
}

export default TargetListItem;
