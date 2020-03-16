import { action as typedAction, ActionType, createStandardAction } from "typesafe-actions";
import { combineReducers } from "redux";

type MenuActionKey = 
  | "menu/toggle"
  | "menu/signup"
  | "menu/signin"

function createMenuAction<T extends MenuActionKey>(actionType: T) {
  return createStandardAction(actionType);
}

// const toggleMenu = createMenuAction('menu/toggle')<{ isOpened: boolean }>();
const toggleMenu = createMenuAction('menu/toggle')();

export type MenuActions = typeof MenuActions;

export const MenuActions = {
  toggleMenu,
}

const MenuState : IMenuState = {
  opened: false,
  signedIn: false,
}

export type MenuActionType = ActionType<typeof MenuActions>;

export interface IMenuState {
  readonly opened: boolean;
  readonly signedIn: boolean;
}

export const MenuReducer = function reducer(state = MenuState, action: MenuActionType){
  switch (action.type) {
    case 'menu/toggle':
      return {
        ...state,
        opened: !state.opened,
      };
  
    default:
      return state;
  }
}