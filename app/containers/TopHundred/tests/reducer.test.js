import expect from 'expect';
import topHundredReducer from '../reducer';
import { fromJS } from 'immutable';

describe('topHundredReducer', () => {
  it('returns the initial state', () => {
    expect(topHundredReducer(undefined, {})).toEqual(fromJS({}));
  });
});
