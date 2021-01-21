import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList } from 'react-native';
import _ from 'lodash';

import styles from './styles';
import { fetchTargets } from '../../../actions/TargetActions';
import TargetListItem from './targetListItem';

class TargetListScreen extends Component {

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={this.props.targets}
					keyExtractor={(item)=>{return item.accessCode}}
					renderItem={({ item})=> {
						return (
							<TargetListItem
								name={item.name}
								accessCode={item.accessCode}
								status={item.status || 'NA'} />
						);
					}} />
			</SafeAreaView>
		);
	}

	componentWillMount() {
		this.props.fetchTargets();
	}
}
const mapStateToProps = (state) => {
	const targets = _.map(state.targets.targets, (object, accessCode) => {
		return {
			name: object.name,
			accessCode: accessCode
		}
	})

	return {...state, targets: targets};
}

export default connect(
	mapStateToProps,
	{ fetchTargets }
)(TargetListScreen);
