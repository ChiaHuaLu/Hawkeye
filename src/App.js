import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import Secrets from './constants/secrets';
import Router from './Router';
import rootReducer from './reducers';

class App extends Component {

	componentDidMount() {
		var firebaseConfig = Secrets.firebaseConfig;

		if (!firebase.apps.length) {
		   firebase.initializeApp(firebaseConfig);
		} else {
		   firebase.app();
		}
	}

	render() {
		const persistedReducer =
			persistReducer(
				{ key: 'root', storage: AsyncStorage },
				rootReducer
			);

		const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistStore(store)}>
					<Router />
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
