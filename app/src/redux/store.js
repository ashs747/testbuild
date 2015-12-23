import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as auth} from './reducers/authReducer';
import {feedReducer as feeds} from './reducers/feedReducer';
import promiseMiddleware from './middleware/promisedActions';
import {reducer as learningJourney} from './reducers/learningJourneyReducer';
import {reducer as modules} from './reducers/moduleReducer';
import {reducer as width} from './reducers/widthReducer';
import {reducer as user} from './reducers/userReducer';
import {reducer as content} from './reducers/contentReducer';
import {reducer as slide} from './reducers/slideReducer';
import {reducer as booking} from './reducers/bookingReducer';
import {reducer as cohort} from './reducers/cohortReducer';
import {reducer as programme} from './reducers/programmeReducer';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk, promiseMiddleware
)(createStore);

const appReducers = combineReducers({
  auth, learningJourney, modules, feeds, width, user, content, slide, booking, cohort, programme
});

export default createStoreWithMiddleware(appReducers);
