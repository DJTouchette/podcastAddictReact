export const apiKey = 'thesportsmatrixADMIN';
export const timeKey = 'thesportsmatrixADMINTIME';
export const minutes = 1000 * 60;
export const hours = minutes * 60;

export const EMAIL = 'email';
export const PASSWORD = 'password';
export const API_BASE = 'http://thesportsmatrix.com/api';
export const API_FIELD = '?api_token=';
export const VERSION = '/v1';

const urlKeys = ['leagues', 'users', 'operations', 'brands',
'handicappers', 'handicappersStatuses', 'products', 'periods', 'picks',
'members', 'events', 'actions', 'demographic', 'userId', 'notification',
'orders', 'payments', 'invites'];

const urlValues = ['/leagues', '/customers_info', '/operations', '/brands',
'/handicappers', '/handicappers/statuses', '/products', '/periods', '/picks',
'/members', '/events', '/actions', '/demographics', '/user', '/notifications',
'/orders', '/payments', '/invites'];

const URLS = () => {
  let URL = { login: API_BASE + '/login'};
  for (let i = 0; i < urlKeys.length; i++) {
    URL[urlKeys[i]] = API_BASE + VERSION + urlValues[i];
  }
  return URL;
};

export const API_URL = URLS();
