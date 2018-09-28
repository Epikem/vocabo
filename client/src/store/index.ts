import { applyMiddleware, combineReducers, createStore } from "redux";
import { CountersAction, CountersReducer } from "./counters";
import { ThemesAction, ThemesReducer } from "./themes";

import { StateType } from "typesafe-actions";
import { SearchAction, SearchReducer, } from "./search";
// import { RouterAction, LocationChangeAction } from 'react-router-redux';
// type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootState = StateType<typeof rootReducer>;
export type RootAction = CountersAction | ThemesAction | SearchAction;

// import { composeEnhancers } from './utils';
// import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // router: routerReducer,
  counter: CountersReducer,
  search: SearchReducer,
  theme: ThemesReducer,
});


function configureStore(initialState?: object) {
  // compose enhancers
  // const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  /* tslint:disable-next-line */
  const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;

  // create store
  // return createStore(rootReducer, initialState!, enhancer);
  return enhancer(rootReducer, initialState!);
}

const store = configureStore();

// export store singleton instance
export default store;
