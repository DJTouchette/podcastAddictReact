/*
 *
 * TopHundred actions
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

export function requestTop100() {
  return {
    type: ACTIONS.REQUEST_TOP_100,
    isFetching: true
  };
}

export function addTop100(list) {
  return {
    type: ACTIONS.ADD_TOP_100,
    isFetching: false,
    list: list
  };
}
