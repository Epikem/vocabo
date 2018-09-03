import { combineReducers } from "redux";
import { action, ActionType } from "typesafe-actions";

const ADD = "counter/ADD";
const INCREMENT = "counter/INCREMENT";

export const add = (amount: number) => action(ADD, amount);
export const increment = () => action(INCREMENT);

type counters = typeof increment | typeof add;

type CountersAction = ActionType<counters>;

interface CountersState {
  readonly reduxCounter: number;
}

// CLASSIC API

const CountersReducer = combineReducers<CountersState, CountersAction>({
  reduxCounter: (state = 0, action) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1; // action: { type: "INCREMENT"; }
      case ADD:
        return state + action.payload; // action: { type: "ADD"; payload: number; }
      default:
        return state;
    }
  }
});

export { CountersReducer, CountersState, CountersAction };