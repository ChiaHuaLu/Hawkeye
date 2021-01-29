import React from 'react';
import { Text, Button, BottomSheet, Divider } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';

import styles from './confirmationBottomSheetStyles';
import Constants from '../../constants/constants';
import SharedStyles from '../../constants/sharedStyles';

export const ConfirmationBottomSheet = ({visible, hideModal, onConfirm, onDecline, confirmText, declineText, promptText }) => {
	return (
		<BottomSheet
			isVisible={visible}
			containerStyle={styles.containerStyle}
			>
			<View style={styles.modalContentView}>
				<Text h4>{promptText}</Text>
				<Divider />
				<View style={styles.buttonsWrapperStyle}>
					<Button
						containerStyle={styles.buttonsContainerStyle}
						buttonStyle={[styles.buttonsStyle, styles.dangerButtonStyle]}
						onPress={() => {
							onConfirm();
							hideModal();
						}}
						title={confirmText}/>
					<Button
						containerStyle={styles.buttonsContainerStyle}
						buttonStyle={[styles.buttonsStyle, SharedStyles.buttonStyle]}
						onPress={() => {
							if (onDecline)
								onDecline();
							hideModal();
						}}
					 	title={declineText}/>
				</View>
			</View>
		</BottomSheet>
	);
};
