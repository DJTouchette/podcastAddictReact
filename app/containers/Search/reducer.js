/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ACTIONS,
} from './constants';

const initialState = fromJS({
  term: '',
  formValue: '',
  isFetching: null,
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case ACTIONS.REQUEST_SEARCH:
      return Object.assign({}, state, {
        ...state,
        isFetching: action.isFetching,
        term: action.term,

      });

    case ACTIONS.ADD_SEARCH:
      return Object.assign({}, state, {
        ...state,
        isFetching: action.isFetching,
        searchList: action.searchList,

      });

    case ACTIONS.SEARCH_FORM_CHANGE:
    return Object.assign({}, state, {
      ...state,
      formValue: action.formValue
    });




    default:
      return state;
  }
}

export default searchReducer;
