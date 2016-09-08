import { take, call, put, select } from 'redux-saga/effects';
import {
  apiGet,
  API_URL,
  apiDelete,
  apiUpdate,
  apiGetBy,
  apiGetFetch,
  apiPostWithJSON,
  apiUpdateWithJSON
} from 'services/api';
import Notifications, { notify } from 'react-notify-toast';

export function* getList(action, url, results) {
  while(true) {
    // Wait for the REQUEST_USERS action
    const info = yield take(action);
    try {
      // Tell redux-saga to call fetch with the specified options
      const response = yield call(apiGetFetch, info.apiKey, url);
      console.log(response);
      // Get object from response
      const parsedJson = response;

      const list = parsedJson.response.rows;
      yield put(results(list));
    }
    catch (err) {
      // Send the error


      yield notify.show('Something went wrong with the request', 'error', 3000);
      // yield put (userResultsError(err));
    }
  }
}

export function* getListById(action, url, results) {
  while(true) {
    // Wait for the REQUEST_USERS action
    const info = yield take(action);
    try {
      // Tell redux-saga to call fetch with the specified options
      const response = yield call(apiGetFetch, info.apiKey, url + '/' + info.id);
      // Get object from response
      const parsedJson = response;

      const list = parsedJson.response.rows;
      console.log(list);
      yield put(results(list));
    }
    catch (err) {
      // Send the error


      yield notify.show('Something went wrong with the request', 'error', 3000);
      console.log(err);
      // yield put (userResultsError(err));
    }
  }
}


export function* deleteItem(action, url, deleteFromStore) {
  while(true) {
    // Wait for the REQUEST_USERS action
    const info = yield take(action);
    console.log('IN DELLLEEEEEETE');
    console.log(info);
    try {
      // Tell redux-saga to call fetch with the specified options
      const response = yield call(apiDelete, info.apiKey, url, info.id);
      console.log(response);
      // Get object from response
      const parsedJson = response;
      if (parsedJson.success == 0) {
        const objKeys = Object.keys(parsedJson.errors);
        const errs = objKeys.map((key, index) => {
          return parsedJson.errors[key][0] + '  ';
        });
        notify.show(errs, 'error', 4000);
      }

      yield put(deleteFromStore(info.id));
      yield notify.show('Deleted the record with a ID of ' + info.id, 'success', 3000 );

    }
    catch (err) {
      // Send the error

      yield notify.show('Something went wrong with the request', 'error', 3000);
    }
  }
}

export function* getBy(action, url, results) {
  while(true) {
    const info = yield take(action);
    try {
      // Tell redux-saga to call fetch with the specified options
      const response = yield call(apiGetBy, info.apiKey, url, info.item );

      // Get object from response
      const parsedJson = yield JSON.parse(response);

      const list = parsedJson.response.rows;
      yield put(results(list));
    }
    catch (err) {
      // Send the error

      yield notify.show('Something went wrong with the request', 'error', 3000);
      // yield put (userResultsError(err));
    }
  }
}

export function* postJSON(action, url) {
  while(true) {
    const info = yield take(action);
    console.log(info);
    try {
      // Tell redux-saga to call fetch with the specified options
      const response = yield call(apiPostWithJSON, info.apiKey, url, info.item );
      // Get object from response
      const parsedJson = response;
      console.log(parsedJson);
      if (parsedJson.success == 0) {
        const objKeys = Object.keys(parsedJson.errors);
        const errs = objKeys.map((key, index) => {
          return parsedJson.errors[key][0] + '  ';
        });
        notify.show(errs, 'error', 4000);
      }

      if (parsedJson.success == 1) {
        notify.show('Succesfully added item', 'success', 3000);
      }

    }
    catch (err) {
      // Send the error
      // window.alert(err);

      // yield notify.show('Something went wrong with the request', 'error', 3000);
      console.log(err)
    }
  }
}


export function* updateItem(action, url, addTo) {
  while(true) {
    // Wait for the REQUEST_USERS action
    const info = yield take(action);
    console.log('IN UPDDAAATE');
    console.log(info);
    try {
      const response = yield call(apiUpdateWithJSON, info.apiKey, url + '/' + info.id, info.form);
      // Get object from response
      const parsedJson = response;
      if (parsedJson.success == 0) {
        const objKeys = Object.keys(parsedJson.errors);
        const errs = objKeys.map((key, index) => {
          return parsedJson.errors[key][0] + '  ';
        });
        notify.show(errs, 'error', 4000);
        return;
      }
      const newList = yield call(apiGetFetch, info.apiKey, url);
      yield put(addTo(newList.response.rows));
      yield notify.show('Update item with a ID of ' + info.id, 'success', 3000 );

    }
    catch (err) {
      // Send the error
      console.log(err);
      yield notify.show('Something went wrong with the request', 'error', 3000);
    }
  }
}
