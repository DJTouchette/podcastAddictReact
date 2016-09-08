import { createSelector } from 'reselect';

/**
 * Direct selector to the topTen state domain
 */
const selectTopTenDomain = () => state => state.get('topTen');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TopTen
 */

const selectTopTen = () => createSelector(
  selectTopTenDomain(),
  (substate) => substate.toJS()
);

export default selectTopTen;
export {
  selectTopTenDomain,
};
