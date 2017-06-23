import React, { Component } from 'react';
import { request } from "../actions/request";
import uuid from 'uuid/v4';
import { REQUEST_STATE_SUCCESS } from '../store/requestStack';

export default class App extends Component {
    componentWillMount() {
        const state = this.props.store.getState();

        if (state.requestStack.requests.length === 0) {
            this.props.store.dispatch(request('http://test.buszewski.com', uuid()));
        }
    }

    render() {
        const state = this.props.store.getState();
        const request = state.requestStack.requests
            .filter(({ state }) => state === REQUEST_STATE_SUCCESS)[0];

        if (request ){
            return <div>Got <strong>{request.data.total}</strong> posts</div>;
        } else {
            return <div>Loading...</div>
        }
    }
}