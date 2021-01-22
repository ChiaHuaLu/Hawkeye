import React, { Component } from 'react';
import { Card, Text, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import styles from './styles';
import { deleteTarget, trackTarget } from '../../../actions/TargetActions';

class TargetListItem extends Component {
	constructor(props) {
		super(props);
	}

	goToTargetManagement() {
		Actions.targetManagement({edit: this.props});
	}

	deleteItem() {
		this.props.deleteTarget(this.props.accessCode);
	}

	trackTarget() {
		this.props.trackTarget(this.props.accessCode);
	}

	listItemStyle() {
		if (this.props.targets.activeTarget !== this.props.accessCode)
			return styles.listItem;
		return {...styles.listItem, ...styles.activeTarget};
	}

	render() {
		console.log(this.listItemStyle())
		const swipeDeleteButton = [
			{
				text: 'Delete',
				backgroundColor: 'red',
				underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
				onPress: this.deleteItem.bind(this)
			}, {
				text: 'Track',
				backgroundColor: 'green',
				underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
				onPress: this.trackTarget.bind(this)
			}];

		return (
			<View>
				<Swipeout right={swipeDeleteButton}
					backgroundColor='transparent'
					autoClose>
					<TouchableOpacity onPress={this.goToTargetManagement.bind(this)}>
						<View style={this.listItemStyle()}>
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

const mapStateToProps = state => {
	console.log(state.targets.activeTarget)
	return state;
};

export default connect(
	mapStateToProps,
	{deleteTarget, trackTarget}
)(TargetListItem);
