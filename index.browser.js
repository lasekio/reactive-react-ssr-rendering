import store from './src/store';
import { render } from 'react-dom';
import App from "./src/App";
import React  from 'react';
import { XmlEntities }  from 'html-entities';
import { AppContainer } from 'react-hot-loader'
import 'reset-css';

const entities = new XmlEntities();

const defaultStore = (window._APP_STORE && JSON.parse(entities.decode(window._APP_STORE))) || {};

const _store = store(defaultStore);

render(<AppContainer><App store={_store}/></AppContainer>, document.getElementById('app'));

if (module.hot) {
    module.hot.accept('./src/App', () => {
        const NextApp = require('./src/App').default;
        render(
            <AppContainer>
                <NextApp store={_store}/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}

console.log('Welcome in browser');