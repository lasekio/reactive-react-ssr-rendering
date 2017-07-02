import { request } from "./request";
import config from '../config';
export const ISSUES_LOAD = 'ISSUES_LOAD';
export const ISSUES_LOADED = 'ISSUES_LOADED';

const loaded = (data) => ({ type: ISSUES_LOADED, issues: data });

export const load = (url, id) => [
    request(`https://api.github.com/repos/facebook/react/issues`, loaded, {
        headers: {
            'Authorization': `token ${config.githubApiKey}`,
        }
    }),
    { type: ISSUES_LOAD },
];
