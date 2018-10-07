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
        this.scroll = this.handleScroll.bind(this);
        this.header = React.createRef();
    }

    componentDidMount() {
        const { resize, scroll } = this;
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', scroll);
        this.setState({ isMobile: isMobileViewport() });
    }

    componentWillUnmount() {
        const { resize, scroll } = this;
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', scroll);
    }

    setWindowSize() {
        const isMobile = isMobileViewport();
        const shouldSetWindowSize = isMobile !== this.state.isMobile;

        if (shouldSetWindowSize) {
            this.setState({ isMobile });
        }
    }

    handleScroll(e) {
        const header = this.header.current;

        const shouldFixHeader = header.scrollTop > 1;

        if (shouldFixHeader !== this.state.shouldFixHeader) {
            this.setState({ shouldFixHeader });
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
