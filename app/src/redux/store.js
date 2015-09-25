import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as auth} from './reducers/authReducer';
import promiseMiddleware from './middleware/promisedActions';
import {reducer as learningJourney} from './reducers/learningJourneyReducer';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk, promiseMiddleware
)(createStore);

const appReducers = combineReducers({
  auth, learningJourney
});

export default createStoreWithMiddleware(appReducers);
