import React, { Component } from 'react';
import _ from 'lodash';

import Navbar from '../Navbar/index';
import Sidebar from '../Sidebar';

import { isMobileViewport } from '../../../lib/util';

import logo from '../../../static/imgs/ecan_logo.png';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMobile: isMobileViewport(),
        };

        this.resize = this.setWindowSize.bind(this);
    }

    componentDidMount() {
        const { resize } = this;
        window.addEventListener('resize', resize);
        this.setState({ isMobile: isMobileViewport() });
    }

    componentWillUnmount() {
        const { resize } = this;
        window.removeEventListener('resize', resize);
    }

    setWindowSize() {
        const isMobile = isMobileViewport();
        const shouldSetWindowSize = isMobile !== this.state.isMobile;

        if (shouldSetWindowSize) {
            this.setState({ isMobile });
        }
    }

    render() {
        return (
            <header>
                <div className="m-auto text-center">
                    <Navbar isMobile={this.state.isMobile} />
                </div>
            </header>
        )
    }
}

export default Header;
