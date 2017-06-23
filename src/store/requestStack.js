export const REQUEST_STATE_PENDING = 'REQUEST_STATE_PENDING';
export const REQUEST_STATE_IN_PROGRESS = 'REQUEST_STATE_IN_PROGRESS';
export const REQUEST_STATE_SUCCESS = 'REQUEST_STATE_SUCCESS';
export const REQUEST_STATE_FAILED = 'REQUEST_STATE_FAILED';

export default () => 0 || { requestsInProgress: 0, requests: [] };