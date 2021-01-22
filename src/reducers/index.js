import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';
import LocationReducer from './LocationReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer,
	location: LocationReducer,
});
