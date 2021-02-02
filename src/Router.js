import React, { Component } from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';

import SplashScreen from './components/screens/splash/SplashScreen';
import AuthenticationScreen from './components/screens/authentication/AuthenticationScreen';
import TargetListScreen from './components/screens/targetList/TargetListScreen';
import TargetManagementScreen from './components/screens/targetManagement/TargetManagementScreen';
import ScannerScreen from './components/screens/scanner/ScannerScreen';
import CameraConfigurationScreen from './components/screens/cameraConfiguration/CameraConfigurationScreen';
import SettingsScreen from './components/screens/settings/SettingsScreen';
import strings from './assets/strings/localizedStrings';
import routeNames from './constants/routeNames';
import { TargetListTabIcon, ScannerTabIcon } from './components/icons';
import Constants from './constants/constants';

const RouterComponent = () => {
	return (
		<Router
				navigationBarStyle={styles.navigationBarStyle}
				titleStyle={styles.headerTitleStyle}
				rightButtonTextStyle={styles.headerTitleStyle}
				 >
			<Scene key={routeNames.root} hideNavBar>
				<Scene
					initial
					key={routeNames.splash}
					component={SplashScreen} />
				<Scene
					key={routeNames.authentication}
					component={AuthenticationScreen} />
				<Tabs key={routeNames.mainFlow}
					tabBarStyle={styles.tabBarStyle}
					headerLayoutPreset={'center'}>
					<Scene
						key={routeNames.targetFlow}
						title={strings.targetsListItemScreenTitle}
						icon={TargetListTabIcon} >
						<Scene
							key={routeNames.targetList}
							component={TargetListScreen} />
						<Scene
							key={routeNames.targetManagement}
							tintColor={Constants.primaryThemeColor}
							component={TargetManagementScreen} />
					</Scene>
					<Scene
						key={routeNames.cameraFlow}
						title={strings.scannerScreenTitle}
						icon={ScannerTabIcon} >
						<Scene
							key={routeNames.scanner}
							component={ScannerScreen} />
						<Scene
							key={routeNames.cameraConfiguration}
							tintColor={Constants.primaryThemeColor}
							component={CameraConfigurationScreen} />
					</Scene>

					<Scene
						key={routeNames.settings}
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
