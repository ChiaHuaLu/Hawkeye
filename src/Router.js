import React, { Component } from 'react';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import {
	AuthenticationScreen,
	TargetListScreen,
	TargetManagementScreen,
	ScannerScreen,
	SettingsScreen
} from './components/screens';


const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar initial>
				<Scene
					key="authentication"
					component={AuthenticationScreen} />
				<Tabs key="mainFlow">
					<Scene key="targetFlow" title="Targets">
						<Scene
							key="targetList"
							component={TargetListScreen} />
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
}




// class  Router extends Component {
//
// 	render() {
// 		const Stack = createStackNavigator();
// 		const Tab = createBottomTabNavigator();
// 		const Switch = createSwitchNavigator();
//
// 		const targetFlow = (
// 			<Stack.Navigator>
// 				<Stack.Screen name="Target List" component={TargetListScreen} />
// 				<Stack.Screen name="Manage Target" component={TargetManagementScreen} />
// 			</Stack.Navigator>
// 		);
//
// 		const mainFlow = (
// 			<Tab.Navigator>
// 				<Tab.Screen name="Target" component={targetFlow} />
// 				<Tab.Screen name="Scanner" component={ScannerScreen} />
// 				<Tab.Screen name="Settings" component={SettingsScreen} />
// 			</Tab.Navigator>
// 		);
//
// 		const navigator = (
// 			<Switch.Navigator>
// 				<Switch.Screen name="Authentication" component={AuthenticationScreen} />
// 				<Switch.Screen name="MainFlow" component={mainFlow} />
// 			</Switch.Navigator>
// 		);
//
// 		return (
// 			<NavigationContainer>
// 				{navigator}
// 			</NavigationContainer>
// 		);
// 	}
	// const switchNavigator = createSwitchNavigator({
	// 	authentication: AuthenticationScreen,
	// 	mainFlow: createBottomTabNavigator({
	// 		scanner: ScannerScreen,
	// 		settings: SettingsScreen,
	// 	})
	// });
	// return createAppContainer(switchNavigator);
// }

export default RouterComponent;
