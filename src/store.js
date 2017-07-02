import {createStore, combineReducers, applyMiddleware} from 'redux';
import requestStack from "./reducers/requestStack";
import requestSideEffect from "./side_effects/requestSideEffect";
import React  from 'react';
import multipleActions from "./middleware/multipleActions";
import issues from "./reducers/issues";

export default (defaultStore = {}) => {
    const store = createStore(
        combineReducers({ requestStack, issues }),
        defaultStore,
        applyMiddleware(multipleActions)
    );

    store.subscribe(requestSideEffect(store));

    return store;
}