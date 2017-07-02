export const REQUEST = 'REQUEST';
export const REQUEST_PROCESS = 'REQUEST_PROCESS';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const request =
    (url, successActionCallback, parameters, id) => ({ type: REQUEST, url, id, successActionCallback, parameters });

export const requestProcess =
    (id) => ({ type: REQUEST_PROCESS, id });

export const requestSuccess =
    (id, data) => ({ type: REQUEST_SUCCESS, id, data });

export const requestFailed =
    (id) => ({ type: REQUEST_FAILED, id });
