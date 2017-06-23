import {
    REQUEST,
    REQUEST_PROCESS,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
} from '../actions/request';

import {
    REQUEST_STATE_PENDING,
    REQUEST_STATE_IN_PROGRESS,
    REQUEST_STATE_SUCCESS,
    REQUEST_STATE_FAILED,
} from '../store/requestStack';

import requestStackStore from '../store/requestStack'

export default (state = requestStackStore(), action) => {
    console.log('ACTION', action.type, state.requestsInProgress, state.requests.length);
    let requestsInProgress = state.requestsInProgress;
    let requests = state.requests;

    switch (action.type) {
        case REQUEST:
            requestsInProgress++;

            requests.push({
                url: action.url,
                id: action.id,
                state: REQUEST_STATE_PENDING,
            });

            break;

        case REQUEST_SUCCESS:
            requests = requests.map(request => request.id === action.id ?
                { ...request, state: REQUEST_STATE_SUCCESS, data: action.data } :
                request
            );

            requestsInProgress--;
            break;

        case REQUEST_FAILED:
            requests = requests.map(request => request.id === action.id ?
                { ...request, state: REQUEST_STATE_FAILED } :
                request
            );

            requestsInProgress--;
            break;

        case REQUEST_PROCESS:
            requests = requests.map(request => request.id === action.id ?
                { ...request, state: REQUEST_STATE_IN_PROGRESS } :
                request
            );

            break;

        default:
            return state;
    }

    return { ...state, requestsInProgress, requests};
};