import React, { Component } from 'react';
import classNames from 'classnames';

import './styles.scss';

class HamburgerMenu extends Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
    }
    render() {
        const {
            open,
            isMobile
        } = this.props;

        return (
            <div className={classNames('hamburger-menu-container', { open, show: isMobile })} ref={this.container}>
                <div className={classNames('hamburger-menu')}>
                    <div className="one" />
                    <div className="two" />
                    <div className="three" />
                </div>
            </div>
        );
    }
}

export default HamburgerMenu;
