import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './Issue.scss';
import style from 'style';
import Hover from "../Hover/Hover";

const BRIGHT_COLORS = ['e7e7e7', 'fffde7'];

const Avatar = ({ url }) => (
    <div {...style(styles.avatar)}>
        <img src={url} {...style(styles.avatarImage)} />
    </div>
);

const isBright = color => BRIGHT_COLORS.indexOf(color) !== -1;

const Label = ({ color = 'red', children}) => (
    <div {...style([styles.label, isBright(color) && styles.labelTextDark], { backgroundColor: '#' + color })}>
        {children}
    </div>
);

const Link = ({ children }) => <Hover type={
    ({ hover }) => (
        <div {...style([styles.link, hover && styles.linkHovered])}>
            { children }
        </div>
    )
}/>;

export default ({ issue }) => (
    <div {...style(styles.issue)}>
        <h5 {...style(styles.info)}>
            <Avatar url={issue.user.avatar_url}/>
            @{issue.user.login}
            {issue.labels.map(label => <Label color={label.color}>{label.name}</Label>)}
        </h5>
        <h3 {...style(styles.issueName)}>
            [<span {...style(styles.ticketNumber)}>#{issue.number}</span>] {issue.title}

            <pre>{JSON.stringify()}</pre>
        </h3>
        <Link>{issue.html_url}</Link>
    </div>
);