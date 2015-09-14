import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as auth} from './reducers/authReducer';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const appReducers = combineReducers({
  auth
});

export default createStoreWithMiddleware(appReducers);
