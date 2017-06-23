import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import requestStack from "./src/reducers/requestStack";
import App from "./src/components/App";
import requestSideEffect from "./src/side_effects/requestSideEffect";
import React  from 'react';
import express from 'express';

const createAppStore = () => {
    const store = createStore(combineReducers({ requestStack }));

    store.subscribe(requestSideEffect(store));

    return store;
};

const app = express();

app.get('/', (req, res) => {
    const store = createAppStore();

    const isThereRequestsLoading = () => store.getState().requestStack.requestsInProgress > 0;

    const sendResponseIfNoRequestsLoading = () => {
        let html = renderToString(<App store={store}/>);

        if (!isThereRequestsLoading()) {
            res.send(html);
        }
    };

    store.subscribe(sendResponseIfNoRequestsLoading);

    sendResponseIfNoRequestsLoading();
});


app.listen(3000);
