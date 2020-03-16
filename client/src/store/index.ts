import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { CountersActionType, CountersReducer } from "./counters";
import { ThemesActionType, ThemesReducer } from "./themes";
import { MenuActionType, MenuReducer } from "./menu";

import { StateType } from "typesafe-actions";
import { SearchActionType, SearchLogic ,SearchReducer } from "./search";

import axios from 'axios';
import { composeWithDevTools   } from 'redux-devtools-extension';
import { createLogicMiddleware } from 'redux-logic';

// import { RouterAction, LocationChangeAction } from 'react-router-redux';
// type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootState = StateType<typeof rootReducer>;
export type RootAction = CountersActionType | ThemesActionType | SearchActionType | MenuActionType;

// import { composeEnhancers } from './utils';
// import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // router: routerReducer,
  counter: CountersReducer,
  search: SearchReducer,
  theme: ThemesReducer,
  menu: MenuReducer,
});

const rootLogic = [
  SearchLogic
];

const deps = { httpClient: axios.create({baseURL: 'https://api.epikem.com/vocabo/'}) };

const logicMiddleware = createLogicMiddleware(rootLogic, deps);

const middleware = applyMiddleware(logicMiddleware);

/* tslint:disable-next-line */
const enhancer = 
  composeWithDevTools (
    middleware,
/* tslint:disable-next-line */
  )

const store = createStore(rootReducer, enhancer);

// function configureStore(initialState?: object) {
//   // compose enhancers
//   // const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//   /* tslint:disable-next-line */
//   const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;

//   // create store
//   // return createStore(rootReducer, initialState!, enhancer);
//   return enhancer(rootReducer, initialState!);
// }

// const store = configureStore();

// export store singleton instance
export default store;
