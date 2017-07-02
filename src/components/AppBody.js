import React, { Component } from 'react';
import { load } from "../actions/issues";
import Issue from "./Issue/Issue";
import {ISSUE_STATE_EMPTY, ISSUE_STATE_LOADED} from "../reducers/issues";
import { connect } from 'react-redux';
import styles from './AppBody.scss';
import style from 'style';

export class AppBody extends Component {
    componentWillMount() {
        const { issues, dispatch } = this.props;

        if(issues.state === ISSUE_STATE_EMPTY) {
            dispatch(load());
        }
    }

    render() {
        const { issues } = this.props;

        if (issues.state === ISSUE_STATE_LOADED){
            return <div {...style([styles.body])}>
                <div {...style([styles.container])}>
                    <h1>Issues:</h1>
                    {issues.issues.map(issue => <Issue issue={issue} key={issue.id}/>)}
                </div>
            </div>;
        } else {
            return <div>Loading...</div>
        }
    }
}

export default connect(state => state)(AppBody);