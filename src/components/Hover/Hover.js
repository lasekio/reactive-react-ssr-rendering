import React, { Component } from 'react';

export default class Hover extends Component {
    state = {
        hover: false,
    };

    mouseEnter() {
        this.setState({ hover: true });
    }

    mouseLeave() {
        this.setState({ hover: false });
    }

    render() {
        const { type : Component } = this.props;

        return <div onMouseEnter={() => this.mouseEnter()} onMouseLeave={() => this.mouseLeave()}>
            <Component hover={this.state.hover} {...this.props} />
        </div>;
    }
}