import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Constants from '../../../constants/constants';
import SharedStyles from '../../../constants/sharedStyles';
import strings from '../../../assets/strings/localizedStrings';
import routeNames from '../../../constants/routeNames';
import { fetchTargets } from '../../../actions/TargetActions';
import TargetListItem from './targetListItem';
import styles from './styles';

class TargetListScreen extends Component {

	renderFlatList() {
		return (
			<FlatList
				data={this.props.targets}
				keyExtractor={(item)=>{return item.accessCode}}
				renderItem={({item})=> {
					return (
						<TargetListItem
							name={item.name}
							accessCode={item.accessCode} />
					);
				}} />
		);
	}

	renderNoItemsMessage() {
		return (
			<View style={styles.noTargetsView}>
				<Text style={styles.noTargetsText}>{strings.noTargetsInList}</Text>
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				{ this.props.targets.length
					? this.renderFlatList()
					: this.renderNoItemsMessage()
				}
			</SafeAreaView>
		);
	}

	componentDidMount() {
		this.props.fetchTargets();
	}
}

TargetListScreen.navigationOptions = {
	title: strings.targetListScreenTitle,
	...SharedStyles.headerStyle,
	headerRight: () => (
		<TouchableOpacity
			onPress={()=>{
				Actions[routeNames.targetManagement]();
			}}>
			<View style={styles.signOutButton}>
				<Icon
					name="add-outline"
					size={Constants.navigationIconSize}
					color={Constants.primaryThemeColor} />
			</View>
		</TouchableOpacity>
	),
}

const mapStateToProps = (state) => {
	const targets = _.map(state.targets.targets, (object, accessCode) => {
		return {
			name: object.name,
			accessCode: accessCode
		};
	});
	return {...state, targets: targets};
};

export default connect(
	mapStateToProps,
	{ fetchTargets }
)(TargetListScreen);
