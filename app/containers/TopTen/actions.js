/*
 *
 * TopTen actions
 *
 */

import {
  DEFAULT_ACTION,
  ACTIONS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestTopTen() {
  return {
    type: ACTIONS.REQUEST_TOP_TEN,
    isFetching: true
  };
}

export function addTopTen(list) {
  return {
    type: ACTIONS.ADD_TOP_TEN,
    isFetching: false,
    list: list,
  };
}

// export function errFetching(err) {
//   return {
//     type: ACTIONS.ADD_TOP_TEN,
//     isFetching: false,
//     err: err
//   };
// }
