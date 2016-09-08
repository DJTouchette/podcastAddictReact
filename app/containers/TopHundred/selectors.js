import { createSelector } from 'reselect';

/**
 * Direct selector to the topHundred state domain
 */
const selectTopHundredDomain = () => state => state.get('topHundred');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TopHundred
 */

const selectTopHundred = () => createSelector(
  selectTopHundredDomain(),
  (substate) => substate.toJS()
);

export default selectTopHundred;
export {
  selectTopHundredDomain,
};
