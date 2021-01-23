import React, { Component } from 'react';
import { Card, Text, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import styles from './styles';
import { deleteTarget, toggleTrackTarget } from '../../../actions/TargetActions';
import { fetchLocation } from '../../../actions/LocationActions';
import { getTimeDifferenceText } from '../../../helpers/updateIntervalHelper';

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
		this.props.toggleTrackTarget(this.props.accessCode);
	}

	listItemStyle() {
		if (this.props.targets.activeTarget !== this.props.accessCode)
			return styles.listItem;
		return {...styles.listItem, ...styles.activeTarget};
	}

	componentDidMount() {
		this.props.fetchLocation(this.props.accessCode);
	}

	getStatusText() {
		const location = this.props.location.targetLocations[this.props.accessCode];
		if (location && location.time) {
			const differenceInSeconds = Math.round((Date.now() - location.time) / 1000);
			return `Updated ${getTimeDifferenceText(differenceInSeconds)}`;
		}
		return "Unavailable"
	}

	render() {
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
							<Text style={[styles.itemAccessCode, styles.itemStatus]}>{this.getStatusText()}</Text>
						</View>
						<Divider />
					</TouchableOpacity>
				</Swipeout>
			</View>
		);
	};
}

const mapStateToProps = state => {
	return state;
};

export default connect(
	mapStateToProps,
	{deleteTarget, toggleTrackTarget, fetchLocation}
)(TargetListItem);
