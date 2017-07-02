import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppBody from "./components/AppBody";

export default ({store, Parent = 'div'}) => (
    <Parent>
        <Provider store={store}>
            <AppBody/>
        </Provider>
    </Parent>
)