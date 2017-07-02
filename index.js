import {createStore, combineReducers, applyMiddleware} from 'redux';
import { renderToString } from 'react-dom/server';
import App from "./src/App";
import React  from 'react';
import express from 'express';
import { XmlEntities } from 'html-entities';
import fs from 'fs';
import store from "./src/store";
import serialize from "serialize-js";
import apicache from 'apicache';

const entities = new XmlEntities();
const app = express();

const once = (fn) => {
    let called = false;

    return () => {
        called || fn();

        called = true;
    }
};


const wrap = (html, state) => {
    let json = JSON.stringify(state).replace(/\\/g, '\\\\');
    let stateString = entities.encode(json);

    // @TODO cache index file
    return fs.readFileSync('./dist/browser/index.html').toString()
        .replace('<div id="app"></div>', `
        <div id="app">${html}</div>
        <script>
            window._APP_STORE = '${stateString}';
        </script>
    `)
};


let req = (req, res) => {
    const _store = store();
    let responseSent = false;

    const isThereRequestsLoading = () => _store.getState().requestStack.requestsInProgress > 0;

    const sendResponseIfNoRequestsLoading = () => {

        let html = renderToString(<App store={_store}/>);

        console.log('RIGHT AFTER RENDER', isThereRequestsLoading());

        if (!isThereRequestsLoading()) {

            res ? res.send(wrap(html, _store.getState())) : console.log(html);

            responseSent = true;


        } else {
            _store.subscribe(once(() => setTimeout(sendResponseIfNoRequestsLoading, 0)));
        }
    };

    sendResponseIfNoRequestsLoading();
};

let cache = apicache.middleware;

app.get('/', cache('5 minutes'), req);
app.use('/assets', cache('5 minutes'), express.static('dist/browser'));
app.listen(3000);
