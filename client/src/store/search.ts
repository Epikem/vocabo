import { createLogic } from 'redux-logic';
import { action as typedAction, ActionType, createStandardAction } from "typesafe-actions";

type SearchActionKey =
  | "search/list/get"
  | "search/list/getautocompletelist"
  | "search/result/request"
  | "search/result/success"
  | "search/result/failure"
  | "search/searchText/change"
  | "search/filters/add"
  | "search/filters/remove"
  | "search/filters/change";

function createSearchAction<T extends SearchActionKey>(actionType: T) {
  return createStandardAction(actionType);
}

const changeSearchText = createSearchAction('search/searchText/change')<{ searchText: string }>();

const getAutocompleteList = createSearchAction('search/list/getautocompletelist')<SearchState>();

const requestSearch = createSearchAction('search/result/request')<{ searchText: string }>();

const processSearchSuccess = createSearchAction('search/result/success')<{ result: Word[] }>();

const processSearchFailure = createSearchAction('search/result/failure')<{ fetchStatus: string }>();

const addSearchFilter = (filter: Filter) => {
  typedAction('search/filters/add', filter)
};

type SearchActions = typeof SearchActions;

const SearchActions = {
  addSearchFilter,
  changeSearchText,
  getAutocompleteList,
  requestSearch,
  processSearchSuccess,
  processSearchFailure,
}

type SearchActionType = ActionType<typeof SearchActions>;

type Language = "English" | "Korean";

type LanguageMap = { [T in Language]: string };

export type Word = LanguageMap & {
  id: number;
};

type Filter = {
  value: string;
  options: {
    filterLang: Language;
  };
};

type SearchState = {
  searchText: string;
  filters: Filter[];
  result: Word[];
  fetchStatus: string;
};

const initialResult: Word[] = [
  {
    id: 0,
    English: 'hello',
    Korean: '안녕',
  },
  {
    id: 1,
    English: 'potato soup',
    Korean: '감자국',
  }
]

const SearchState : SearchState = {
  searchText: '',
  filters: [],
  result: initialResult,
  fetchStatus: ''
}

/**
 * SearchLogic fetches search result from backend server 
 * and maps the result to search state
 */
const SearchLogic = createLogic<SearchState,any,any,any,any,SearchActionKey>({
  // using any for not important third party library usage
  type: 'search/result/request',
  debounce: 500, /* ms */
  latest: true,  /* take latest only */

  /* let's prevent empty requests */
  validate({ getState, action }, allow, reject: any) {
    if (action.payload) {
      allow(action);
    } else {  /* empty request, silently reject */
      reject();
    }
  },

  // use axios injected as httpClient from configureStore logic deps
  process({ httpClient, getState, action } : any, dispatch : any, done: any) {
      const query = action.payload.searchText;
      const apiurl = `/api/v1.0/autocomplete/elastic/en/${query}`;
      const res = httpClient.get(apiurl);
    
      res.then((v: any)=>{
        console.log(v.data);

        // parsed word map
        const mapped: Word[] = v.data;
        return mapped;
      }).then((mapped: Word[]) => {
        const result = {
          result: mapped
        }
        // console.log(mapped);
        dispatch(processSearchSuccess(result));
      }).catch((err: any) => {
        console.error(err); // might be a render err
        dispatch(processSearchFailure(err))
      })
      .then(() => done()); // call done when finished dispatching
  }
});

const SearchReducer = function reducer(state = SearchState, action:SearchActionType) {
  switch(action.type) {
  case 'search/searchText/change':
    return {
      ...state,
      searchText: action.payload.searchText,
    }
  case 'search/result/request':
    return {
      ...state,
      fetchStatus: `fetching for ${action.payload}... ${(new Date()).toLocaleString()}`,
    };
  case 'search/result/success':
    return {
      ...state,
      result: action.payload.result,
      fetchStatus: `Results from ${(new Date()).toLocaleString()}`
    };
  case 'search/result/failure':
    return {
      ...state,
      fetchStatus: `errored: ${action.payload}`
    };
  default:
    return state;
  }
}

export { SearchActions, SearchState, SearchActionType, SearchReducer, SearchLogic };