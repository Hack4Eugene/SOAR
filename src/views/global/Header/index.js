import React, { Component } from 'react';
import classNames from 'classnames';

import Navbar from '../Navbar/index';

import { isMobileViewport } from '../../../lib/util';

import './styles.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMobile: false,
            shouldFixHeader: false
        };

        this.resize = this.setWindowSize.bind(this);
        this.header = React.createRef();
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
            <header ref={this.header} className={classNames({ fixed: this.state.shouldFixHeader })}>
                <div className="m-auto text-center">
                    <Navbar isMobile={this.state.isMobile} />
                </div>
            </header>
        );
    }
}

export default Header;
