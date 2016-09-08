import { take, call, put, select } from 'redux-saga/effects';
import { ACTIONS } from './constants';
import { addTopTen } from './actions';
import { apiGetFetch } from 'services/api';

const topTenUrl = 'https://itunes.apple.com/us/rss/toppodcasts/limit=10/json';

// Individual exports for testing
export function* getTopTen() {
  while(true) {

    const info = yield take(ACTIONS.REQUEST_TOP_TEN);
    try {

      const response = yield call(apiGetFetch, topTenUrl);
      yield put(addTopTen(response.feed.entry));
    }
    catch (err) {
      console.log(err);
      // yield put (userResultsError(err));
    }
  }
}


// All sagas to be loaded
export default [
  getTopTen,
];
