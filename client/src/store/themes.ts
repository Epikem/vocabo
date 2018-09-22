import { bindActionCreators, combineReducers } from "redux";
import { action as typedAction, ActionType } from "typesafe-actions";
import { getTheme, ITheme, } from './../theme/index';

const CHANGE = "theme/CHANGE";

export const changeTheme = (theme: string) => typedAction(CHANGE, theme);

type themes = typeof changeTheme;

type ThemesAction = ActionType<themes>;

interface IThemesState {
  readonly currentTheme: ITheme;
}

const ThemesReducer = combineReducers<IThemesState, ThemesAction>({
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

export { ThemesReducer, IThemesState, ThemesAction };
