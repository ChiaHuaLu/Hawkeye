import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';

class ScannerTabIcon extends Component {
	render() {
		return (
			<Icon name="scan-outline" size={styles.iconSize} color={styles.color} />
		);
	}
}

export { ScannerTabIcon };
