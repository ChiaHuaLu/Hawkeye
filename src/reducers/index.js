import AuthReducer from './AuthReducer'
import TargetsReducer from './TargetsReducer'
import { combineReducers } from 'redux';

export default combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer
});
