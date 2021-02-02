import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';
import LocationReducer from './LocationReducer';
import ConfigurationReducer from './ConfigurationReducer';

export default combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer,
	location: LocationReducer,
	configuration: ConfigurationReducer,
});
