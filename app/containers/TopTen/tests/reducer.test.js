import expect from 'expect';
import topTenReducer from '../reducer';
import { fromJS } from 'immutable';

describe('topTenReducer', () => {
  it('returns the initial state', () => {
    expect(topTenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
