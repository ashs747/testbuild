import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as auth} from './reducers/authReducer';
import {feedReducer as feeds} from './reducers/feedReducer';
import promiseMiddleware from './middleware/promisedActions';
import {reducer as learningJourney} from './reducers/learningJourneyReducer';
import {reducer as modules} from './reducers/moduleReducer';
import {reducer as width} from './reducers/widthReducer';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk, promiseMiddleware
)(createStore);

const appReducers = combineReducers({
  auth, learningJourney, modules, feeds, width
});

export default createStoreWithMiddleware(appReducers);
