/*
 *
 * Search actions
 *
 */

import {
  DEFAULT_ACTION,
  ACTIONS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestSearch(term) {
  return {
    type: ACTIONS.REQUEST_SEARCH,
    term: term,
    isFetching: true,
  };
}

export function addSearch(searchList) {
  return {
    type: ACTIONS.ADD_SEARCH,
    searchList: searchList,
    isFetching: false,
  };
}

export function searchForm(event) {
  return {
    type: ACTIONS.SEARCH_FORM_CHANGE,
    formValue: event.target.value,
  };
}
