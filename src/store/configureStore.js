import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import carsReducer from '../reducers/cars';
import servicesReducer from '../reducers/services';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

let composeEnhancers;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Prevents Redux DevTools from re-dispatching all previous actions.
      shouldHotReload: false
    }) || compose;
} else {
  composeEnhancers = compose;
}
const enhancer = composeEnhancers(applyMiddleware(thunk, loggerMiddleware));

export default () => {
  //store creation
  const store = createStore(
    combineReducers({
      cars: carsReducer,
      services: servicesReducer,
      filters: filtersReducer,
      auth: authReducer,
    }),
    enhancer
  );

  return store;
};

