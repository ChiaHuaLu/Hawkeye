import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';

class SettingsTabIcon extends Component {
	render() {
		return (
			<Icon name="cog-outline" size={styles.iconSize} />
		);
	}
}

export { SettingsTabIcon };
