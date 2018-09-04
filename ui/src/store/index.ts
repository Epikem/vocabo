import { applyMiddleware, combineReducers, createStore } from "redux";
import { CountersAction, CountersReducer } from "./counters";

import { StateType } from "typesafe-actions";
// import { RouterAction, LocationChangeAction } from 'react-router-redux';
// type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootState = StateType<typeof rootReducer>;
// export type RootAction = ReactRouterAction | CountersAction;
export type RootAction = CountersAction;

// import { composeEnhancers } from './utils';
// import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // router: routerReducer,
  counter: CountersReducer
});

function configureStore(initialState?: object) {
  // compose enhancers
  // const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  // create store
  // return createStore(rootReducer, initialState!, enhancer);
  return createStore(rootReducer, initialState!);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
