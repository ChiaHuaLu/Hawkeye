import React, { Component } from 'react';
import { Card, Text, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import styles from './styles';
import { deleteTarget } from '../../../actions/TargetActions';

class TargetListItem extends Component {
	constructor(props) {
		super(props);
	}

	goToTargetManagement() {
		Actions.targetManagement({edit: this.props});
	}

	deleteItem() {
		console.log("Delete", this.props.accessCode);
		this.props.deleteTarget(this.props.accessCode);
	}

	render() {
		const swipeDeleteButton = [{
			text: 'Delete',
			backgroundColor: 'red',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
			onPress: this.deleteItem.bind(this)
		}];

		return (
			<View>
				<Swipeout right={swipeDeleteButton}
					backgroundColor='transparent'>
					<TouchableOpacity onPress={this.goToTargetManagement.bind(this)}>
						<View style={styles.listItem}>
							<Text style={[styles.itemDescription, styles.itemDetails]}>{this.props.name}</Text>
							<Text style={[styles.itemAccessCode, styles.itemStatus]}>{this.props.status}</Text>
						</View>
						<Divider />
					</TouchableOpacity>
				</Swipeout>
			</View>
		);
	};
}

export default connect(
	null, {deleteTarget}
)(TargetListItem);
