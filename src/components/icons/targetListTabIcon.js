import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';

class TargetListTabIcon extends Component {
	render() {
		return (
			<Icon name="list-outline" size={styles.iconSize} color={styles.color} />
		);
	}
}

export { TargetListTabIcon };
