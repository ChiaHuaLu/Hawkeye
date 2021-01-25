import React, { Component } from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';

import SplashScreen from './components/screens/splash/SplashScreen';
import AuthenticationScreen from './components/screens/authentication/AuthenticationScreen';
import TargetListScreen from './components/screens/targetList/TargetListScreen';
import TargetManagementScreen from './components/screens/targetManagement/TargetManagementScreen';
import ScannerScreen from './components/screens/scanner/ScannerScreen';
import SettingsScreen from './components/screens/settings/SettingsScreen';
import { TargetListTabIcon } from './components/icons';

const RouterComponent = () => {
	return (
		<Router titleStyle={styles.navigationBar}>
			<Scene key="root" hideNavBar>
				<Scene
					initial
					key="splash"
					component={SplashScreen} />
				<Scene
					key="authentication"
					component={AuthenticationScreen} />
				<Tabs key="mainFlow"
					tabBarStyle={styles.tabBar}
					headerLayoutPreset={'center'}>
					<Scene
						key="targetFlow"
						icon={TargetListTabIcon}
						title="Targets">
						<Scene
							key="targetList"
							component={TargetListScreen}
							rightTitle={"Add"}
							onRight={()=>{Actions.targetManagement()}} />
						<Scene
							key="targetManagement"
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
	navigationBar: {
	},
	tabBar: {
	}
};

export default RouterComponent;
