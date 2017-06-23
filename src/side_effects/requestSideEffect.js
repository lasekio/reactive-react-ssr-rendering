import { requestProcess, requestSuccess, requestFailed } from "../actions/request";
import { REQUEST_STATE_PENDING } from '../store/requestStack';
import axios from 'axios';

export default store => () => {
    const { requestStack } = store.getState();

    requestStack.requests
        .filter(({ state }) => state === REQUEST_STATE_PENDING)
        .map(request => {
            store.dispatch(requestProcess(request.id));

            axios.get(request.url)
                .then(({ data }) => {
                    store.dispatch(requestSuccess(request.id, data))
                })
                .catch(() => {
                    store.dispatch(requestFailed(request.id))
                });
        });
};