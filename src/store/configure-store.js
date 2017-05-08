import rootReducer from '../reducers/root-reducer';
import {createStore} from 'redux';

export default (initialState) => {
  return createStore(rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};