import { take, call, put, select } from 'redux-saga/effects';
import { ACTIONS } from './constants';
import { addSearch } from './actions';
import { apiGetFetch } from 'services/api';

export function* getSearch() {
  while(true) {
    const info = yield take(ACTIONS.REQUEST_SEARCH);
    try {
      if (info.term === undefined) {
        yield put(addSearch([]));
        return;
      }
      const searchTerm = yield info.term.replace(' ', '+');
      const requestUrl = yield ['https://itunes.apple.com/search?term=', searchTerm,'&country=ca&entity=podcast'].join('');
      const response = yield call(apiGetFetch, requestUrl);
      yield put(addSearch(response.results));
    }
    catch (err) {
      console.log(err);
    }
  }
}

// All sagas to be loaded
export default [
  getSearch,
];
