import React, { Component } from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';

import SplashScreen from './components/screens/splash/SplashScreen';
import AuthenticationScreen from './components/screens/authentication/AuthenticationScreen';
import TargetListScreen from './components/screens/targetList/TargetListScreen';
import TargetManagementScreen from './components/screens/targetManagement/TargetManagementScreen';
import ScannerScreen from './components/screens/scanner/ScannerScreen';
import SettingsScreen from './components/screens/settings/SettingsScreen';
import { TargetListTabIcon } from './components/icons';
import Constants from './constants/constants';

const RouterComponent = () => {
	return (
		<Router
				navigationBarStyle={styles.navigationBarStyle}
				titleStyle={styles.headerTitleStyle}
				rightButtonTextStyle={styles.headerTitleStyle}
				 >
			<Scene key="root" hideNavBar>
				<Scene
					initial
					key="splash"
					component={SplashScreen} />
				<Scene
					key="authentication"
					component={AuthenticationScreen} />
				<Tabs key="mainFlow"
					tabBarStyle={styles.tabBarStyle}
					headerLayoutPreset={'center'}>
					<Scene
						key="targetFlow"
						title="Targets"
						icon={TargetListTabIcon} >
						<Scene
							key="targetList"
							component={TargetListScreen} />
						<Scene
							key="targetManagement"
							tintColor={Constants.primaryThemeColor}
							component={TargetManagementScreen} />
					</Scene>
					<Scene
						key="scanner"
						component={ScannerScreen} />
					<Scene
						key="settings"
						component={SettingsScreen} />
				</Tabs>
			</Scene>
		</Router>
	);
};

const styles = {
	tabBarStyle: {
		backgroundColor: Constants.secondaryThemeColor
	},
	headerTitleStyle: {
		color: Constants.primaryThemeColor
	},
	navigationBarStyle: {
		backgroundColor: Constants.secondaryThemeColor
	},
};

export default RouterComponent;
