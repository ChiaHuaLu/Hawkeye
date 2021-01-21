import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './Router';
import rootReducer from './reducers'

class App extends Component {

	componentWillMount() {
		var firebaseConfig = {
			apiKey: "AIzaSyDJIDDwuSJgaC85r_F-_NylxJH51C2eWNw",
			authDomain: "projecthawkeye-bc56f.firebaseapp.com",
			databaseURL: "https://projecthawkeye-bc56f-default-rtdb.firebaseio.com",
			projectId: "projecthawkeye-bc56f",
			storageBucket: "projecthawkeye-bc56f.appspot.com",
			messagingSenderId: "911124594014",
			appId: "1:911124594014:web:86d80ff56be809a8a963cf",
			measurementId: "G-PTY44XHSXW"
		};

		if (!firebase.apps.length) {
		   firebase.initializeApp(firebaseConfig);
		} else {
		   firebase.app();
		}

	}

	render() {
		const persistedReducer =
			persistReducer({key: 'root', storage: AsyncStorage }, rootReducer)

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
