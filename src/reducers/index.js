import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';
import LocationReducer from './LocationReducer';

export default combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer,
	location: LocationReducer,
});
