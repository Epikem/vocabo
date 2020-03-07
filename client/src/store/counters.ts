import { combineReducers } from "redux";
import { action as typedAction, ActionType } from "typesafe-actions";

const ADD = "counter/ADD";
const INCREMENT = "counter/INCREMENT";

export const add = (amount: number) => typedAction(ADD, amount);
export const increment = () => typedAction(INCREMENT);

type counters = typeof increment | typeof add;

export type CountersActionType = ActionType<counters>;

export interface ICountersState {
  readonly reduxCounter: number;
}

// CLASSIC API

export const CountersReducer = combineReducers<ICountersState, CountersActionType>({
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
