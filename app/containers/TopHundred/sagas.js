import { take, call, put, select } from 'redux-saga/effects';
import { ACTIONS } from './constants';
import { addTop100 } from './actions';
import { apiGetFetch, apiGet } from 'services/api';

const top100Url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/json';

export function* getTop100() {
  while(true) {
    const info = yield take(ACTIONS.REQUEST_TOP_100);

    try {
      const response = yield call(apiGet, top100Url);
      const parsedJson = yield JSON.parse(response);
      yield put(addTop100(parsedJson.feed.entry));
    }
    catch (err) {
      console.log(err);
    }
  }
}

// All sagas to be loaded
export default [
  getTop100
];
