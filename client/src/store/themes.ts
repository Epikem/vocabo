import { bindActionCreators, combineReducers } from "redux";
import { action as typedAction, ActionType } from "typesafe-actions";
import { getTheme, Theme, } from './../theme/index';

const CHANGE = "theme/CHANGE";

export const changeTheme = (theme: string) => typedAction(CHANGE, theme);

type themes = typeof changeTheme;

export type ThemesActionType = ActionType<themes>;

export interface IThemesState {
  readonly currentTheme: Theme;
}

export const ThemesReducer = combineReducers<IThemesState, ThemesActionType>({
  currentTheme: (state = getTheme('dark'), action) => {
    switch (action.type) {
      case CHANGE:
        if (action.payload === 'light') {
          return getTheme('light');
        }
        else {
          return getTheme('dark'); 
        }
      default:
        return state;
    }
  }
});
