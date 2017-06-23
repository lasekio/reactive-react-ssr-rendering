export const REQUEST = 'REQUEST';
export const REQUEST_PROCESS = 'REQUEST_PROCESS';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const request = (url, id) => 0 || { type: REQUEST, url, id };
export const requestProcess = (id) => 0 || { type: REQUEST_PROCESS, id };
export const requestSuccess = (id, data) => 0 || { type: REQUEST_SUCCESS, id, data };
export const requestFailed = (id) => 0 || { type: REQUEST_FAILED, id };