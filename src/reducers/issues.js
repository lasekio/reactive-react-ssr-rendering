import {ISSUES_LOAD, ISSUES_LOADED} from "../actions/issues";

export const ISSUE_STATE_EMPTY = 'ISSUE_STATE_EMPTY';
export const ISSUE_STATE_LOADING = 'ISSUE_STATE_LOADING';
export const ISSUE_STATE_LOADED = 'ISSUE_STATE_LOADED';

export default (store = { state: ISSUE_STATE_EMPTY, issues: [] }, action) => {
    console.log('ACTION', action.type);

    switch(action.type) {
        case ISSUES_LOAD:
            return { ...store, state: ISSUE_STATE_LOADING };
        case ISSUES_LOADED:
            let issues = action.issues;
            return { ...store, issues: issues, state: ISSUE_STATE_LOADED };
    }

    return store;
}
