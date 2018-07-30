import React from 'react';
import classNames from 'classnames';

import './styles.scss'

export const HamburgerMenu = ({ clickFn, open, isMobile }) => (
    <div className={classNames('hamburger-menu-container', { open, show: isMobile })}>
        {console.log({isMobile})}
        <div className={classNames('hamburger-menu')} onClick={() => clickFn()}>
            <div className="one" />
            <div className="two" />
            <div className="three" />
        </div>
    </div>
);