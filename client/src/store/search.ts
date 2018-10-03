import { Action, combineReducers } from "redux";
import { action as typedAction, ActionType, createStandardAction } from "typesafe-actions";

type SearchActionKey =
  | "search/list/get"
  | "search/list/getautocompletelist"
  | "search/searchText/change"
  | "search/filters/add"
  | "search/filters/remove"
  | "search/filters/change";

function createSearchAction<T extends SearchActionKey>(actionType: T) {
  return createStandardAction(actionType);
}

const changeSearchText = createSearchAction('search/searchText/change')<{ searchText: string }>();

const getAutocompleteList = createSearchAction('search/list/getautocompletelist')<SearchState>();

const addSearchFilter = (filter: filter) => {
  typedAction('search/filters/add', filter)
};

export const SearchActions = {
  addSearchFilter,
  changeSearchText,
  getAutocompleteList,
}

type SearchActionType = ActionType<typeof SearchActions>;

type language = "English" | "Korean";

type languageMap = { [T in language]: string };

type word = languageMap & {
  id: number;
};

type wordList = {
  list: word[];
};

type filter = {
  value: string;
  options: {
    filterLang: language;
  };
};

type SearchState = {
  searchText: string;
  filters: filter[];
  result: word[];
};

const initialResult: word[] = [
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
}

const SearchReducer = combineReducers<SearchState, SearchAction>({
  searchText: (state = '', action) => {
    switch (action.type) {
      case 'search/searchText/change':
        return action.payload.searchText;
      default:
        return state;
    }
  },
  filters: (state = [], action) => [],
  result: (state = initialResult, action) => {
    switch (action.type) {
      case 'search/list/getautocompletelist':
        // action.payload.
        break;

      default:
        break;
    }
    return state;
  },
});

export { SearchReducer, SearchState, SearchAction };

// import axios from 'axios';

// const query = searchText;
// const api_url = `https://ac.dict.naver.com/enendict/ac?_callback=window.__jindo2_callback.$2414&q=${query}&q_enc=utf-8&st=11001&r_format=json&r_enc=utf-8&r_lt=11001&r_unicode=0&r_escape=1`;
// const options = {
//     url: api_url,
// };

// axios.get(api_url, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         res.writeHead(200, {
//             'Content-Type': 'text/json;charset=utf-8'
//         });
//         res.end(body);
//     } else {
//         res.status(response.statusCode).end();
//         console.log('error = ' + response.statusCode);
//     }
// });

// const res = axios.get(api_url);

