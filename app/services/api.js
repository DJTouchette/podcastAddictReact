import { apiKey, timeKey, API_URL, API_FIELD, hours, minutes, EMAIL, PASSWORD } from './constants';
import { browserHistory } from 'react-router';

/**
*
* @FunctionDescription toQueryString
* @Return url {string} | Returns url with params passed in.
* @params data {JSON object} | Object with field wanted to update, and value.
*
*/
function toQueryString(obj, searchBy) {
    if (searchBy) {
      var parts = [];
      for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
              parts.push(encodeURIComponent('s_' + i) + "=" + encodeURIComponent(obj[i]));
          }
      }
      return parts.join("&");
    }
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
}

/**
*
* @FunctionDescription getRemainder
* @Return remainder {number} | The difference between the passed in timestamp and current time.
*
*/

function getRemainder(timestamp) {
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const date = new Date();
  const timeNow = date.getTime();
  const timeToken = new Date(timestamp).getTime();
  const tokenInMinutes = Math.round(timeToken / minutes);
  const timeNowInMinutes = Math.round(timeNow / minutes);
  const remainder = tokenInMinutes - timeNowInMinutes;
  return remainder;
}

/**
*
* @FunctionDescription updateTimeStamp
* Updates timestamp and stores in local storage.
*
*/
function updateTimeStamp() {
  const timestamp = new Date();
  const addedTimeStamp = window.localStorage.setItem(timeKey, String(timestamp));
}
/**
*
* @FunctionDescription checkTimeStamp
* @Return {boolean} | If timestamp is not expired (24 hours), also updates timestamp if valid.
*
*/
function checkTimeStamp(stamp) {
  const timestamp = window.localStorage.getItem(timeKey);

  if (timestamp === null) {
    return false;
  }

  const remainder = getRemainder(timestamp);

  if (remainder >= 0 ) {
    return false;
  }

  updateTimeStamp();
  return true;
}

/**
*
* @FunctionDescription getToken
* @Return {false || stirng} | false if token is not valid or expired. Token as a string is all is well.
*
*/

export function getToken() {
  const timestamp = window.localStorage.getItem(apiKey);
  const usersToken = window.localStorage.getItem(apiKey);
  const isExpired = checkTimeStamp(timestamp);

  if (isExpired) {
    return isExpired;
  }

  return usersToken;
}

/**
*
* @FunctionDescription makeToken
* @Return token {string} | The token that has been added to local storage.
*
*/
export function makeToken(token) {
  const timestamp = new Date();
  const addedToken = window.localStorage.setItem(apiKey, token);
  const addedTimeStamp = window.localStorage.setItem(timeKey, String(timestamp));
  return addedToken;
}

export function checkForRedirect() {
  const hasToken = getToken();
  if (!hasToken) {
    browserHistory.push('/login');
    return false;
    }
  return hasToken;
}

/**
*
* @FunctionDescription defaultHeaders
* @Return headers {Header object} | Default headers for a api request.
*
*/

function defaultHeaders() {
  let headers = new Headers();
  headers.append('Access-Control-Allow-Credentials', true);
  headers.append('Access-Control-Allow-Headers','x-requested-with');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('X-Requested-With','XMLHttpRequest');
  headers.append('Origin', 'http://localhost:62102');
  headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');

  return headers;
}

function JSONHeaders() {
  let headers = defaultHeaders();
  headers.append('Content-Type','application/json');
  return headers;
}

/**
*
* @FunctionDescription optsPost
* @Return init {object} | Makes a object of its parameters.
* @params forData {FormData object} | Parameters of request.
* @params headers {Headers object} | Headers of the request.
* @params url {string} | Request url.
*/

function optsPost(formData, headers, url) {
  const init = {
    method: 'POST',
    credentials: 'include',
    params: formData,
    headers: headers,
    url: url,
  };
    return init;
}

/**
*
* @FunctionDescription optsUpdate
* @Return init {object} | Makes a object of its parameters.
* @params data {FormData object} | Parameters of request.
* @params headers {Headers object} | Headers of the request.
* @params url {string} | Request url.
*/
function optsUpdate(headers, url) {
  const init = {
    method: 'UPDATE',
    credentials: 'include',
    headers: headers,
    url: url,
  };
  return init;
}

/**
*
* @FunctionDescription optsGet
* @Return init {object} | Makes a object of its parameters.
* @params headers {Headers object} | Headers of the request.
* @params url {string} | Request url.
*/
function optsGet(headers, url) {
  const init = {
    method: 'GET',
    credentials: 'include',
    headers: headers,
    url: url,
    }
  return init;
}

function optsDelete(headers, url) {
  const init = {
    method: 'DELETE',
    credentials: 'include',
    headers: headers,
    url: url,
    }
  return init;
}

// function apiFetch (url, init) {
//   const apiCall = fetch(url, init)
//     .then((result) => {
//       return result.json();
//     })
//     .then((json) => {
//       return json;
//     });
//
//     return apiCall;
// }

//Routes

/**
*
* @FunctionDescription apiLogin request to api for login.
* @Return json {json} | json response of api call.
* @params email {string} | The email of the requestor.
* @params password {string} | The password of the requestor.
*/
export function apiLogin(email, password) {
  const headers = defaultHeaders();
  // Form data object
  let formData = new FormData();
  formData.append(EMAIL, email);
  formData.append(PASSWORD, password);

  const init = optsPost(formData, headers, API_URL.login);
  const json = apiFetch(init);
  return json;
}


/**
*
* @FunctionDescription apiFetch a wrapper for xhr request.
* @Return response {json} | json response of api call.
* @params opts {object} | returned from (optsGet, optsPost).
*
*/
export function apiFetch (opts) {
  const request = new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url, false);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    const params = opts.params;
    xhr.withCredentials = false;
    xhr.send(params);
  }).then( (hello) => {
    return hello;
  });
  return request;
}

/**
*
* @FunctionDescription apiGet wrapper for a GET call to the api.
* @Return json {json} | json response of api call.
* @params apiKey {string} | api key of the logged in user.
* @params path {string} | The path of the request.
*/
export function apiGet(path) {
  const headers = defaultHeaders();
  const url = path;
  // Form data object
  const init = optsGet(headers, url);
  const json = apiFetch(init);

  return json;
}

  export function apiGetFetch(path) {
    const headers = defaultHeaders();
    const url = path;
    // Form data object
    const init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
    }
    const json = fetch(url, init)
      .then((response) => {
        return response.json()
          .then((json) => {
            return json;
        })
      });

    return json;
}


export function apiPostWithJSON(apiKey, path, obj) {
  console.log('apiPost');
  const url = path + API_FIELD + apiKey;
  const params = JSON.stringify(obj);
  const myHeaders = new Headers({
  "Content-Type": "application/json",
  });
  const response = fetch(url, {
  method: "POST",
  body: params,
  headers: myHeaders,
  mode: 'cors',
  }).then((response) => {
    return response.json().then((json) => {
      console.log('heeellllooo');
      console.log(json);
      return json;
    });
  });
  console.log(response);
  return response;
}

export function apiUpdateWithJSON(apiKey, path, obj) {
  console.log('apiUpdate');
  const url = path + API_FIELD + apiKey;
  const params = JSON.stringify(obj);
  const myHeaders = new Headers({
  "Content-Type": "application/json",
  });
  const response = fetch(url, {
  method: "PUT",
  body: params,
  headers: myHeaders,
  mode: 'cors',
  }).then((response) => {
    return response.json().then((json) => {
      console.log('heeellllooo');
      console.log(json);
      return json;
    });
  });
  console.log(response);
  return response;
}

// export function apiUpdateWithJSON(apiKey, id, form, path) {
//   const merged = Object.assign(...form);
//   const query = toQueryString(merged);
//   const url = path + '/' + id + API_FIELD + apiKey + '&' + query;
//   const headers = defaultHeaders();
//   const init = optsUpdate(headers, url);
//
//   const json = apiFetch(init);
//   return json;
//
// }

export function apiDelete(apiKey, path, id) {
  const url = path + API_FIELD + apiKey;
  const myHeaders = new Headers({
  "X-Requested-With": "XMLHttpRequest",
  });
  const response = fetch(url, {
  method: "DELETE",
  headers: myHeaders,
  mode: 'cors',
  }).then((response) => {
    return response.json().then((json) => {
      console.log('heeellllooo');
      console.log(json);
      return json;
    });
  });

  return response;

  // const headers = defaultHeaders()
  // const url = path + '/' + id + API_FIELD + apiKey;
  // const init = optsDelete(headers, url);
  // const json = apiFetch(init);
  // console.log(json);
  // return json;
}


// export function apiGetById(apiKey, path, id) {
//   const merged = Object.assign(...params);
//   const query = toQueryString(merged, true);
//   const headers = defaultHeaders();
//   const url = path + API_FIELD + apiKey + '&' + query
//   // Form data object
//   const init = optsGet(headers, url);
//   const json = apiFetch(init);
//   return json;
// }

export function apiGetBy(apiKey, path, params) {
  const merged = Object.assign(...params);
  const query = toQueryString(merged, true);
  const headers = defaultHeaders();
  const url = path + API_FIELD + apiKey + '&' + query
  // Form data object
  // const init = optsGet(headers, url);
  // const json = apiFetch(init);
  return apiGetFetch(apiKey, url);
}


export function apiUpdate(apiKey, id, form, path) {
  const merged = Object.assign(...form);
  const query = toQueryString(merged);
  const url = path + '/' + id + API_FIELD + apiKey + '&' + query;
  const headers = defaultHeaders();
  const init = optsUpdate(headers, url);

  const json = apiFetch(init);
  return json;

}
