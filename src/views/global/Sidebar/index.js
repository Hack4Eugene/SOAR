import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

class Sidebar extends Component {
    render() {
        const {
            open
        } = this.props;

        return (
            <div className={classNames('sidebar', { open })}>
                <ul>
                    <li>
                        <NavLink className="" to="/">
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="" to="/events">
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="" to="/explore">
                            Explore
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="" to="/profile">
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;
