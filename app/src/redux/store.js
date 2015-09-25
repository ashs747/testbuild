import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as auth} from './reducers/authReducer';
import {reducer as learningJourney} from './reducers/learningJourneyReducer';
import {reducer as modules} from './reducers/moduleReducer';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const appReducers = combineReducers({
  auth, learningJourney, modules
});

export default createStoreWithMiddleware(appReducers);
