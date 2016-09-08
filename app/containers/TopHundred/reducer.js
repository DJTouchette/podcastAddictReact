/*
 *
 * TopHundred reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ACTIONS,
} from './constants';

const initialState = fromJS({});

function topHundredReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case ACTIONS.REQUEST_TOP_100:
      return Object.assign({}, state, {
        ...state,
        isFetching: action.isFetching,
      });


    case ACTIONS.ADD_TOP_100:
      return Object.assign({}, state, {
        ...state,
        isFetching: action.isFetching,
        list: action.list
      });

    default:
      return state;
  }
}

export default topHundredReducer;
