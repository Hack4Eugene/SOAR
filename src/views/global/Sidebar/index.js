import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

class Sidebar extends Component {
    getControls = () => {
        const isLoggedIn = this.props.isLoggedIn;

        return !isLoggedIn
            ? (
               <Fragment>
                   <li>
                       <NavLink to="/adduser">New User</NavLink>
                   </li>
                   <li>
                       <NavLink to="/login">Login</NavLink>
                   </li>
               </Fragment>
            ) : (
                <li>
                    <NavLink to="/logout">Logout</NavLink>
                </li>
            );
    };

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
                    <hr />
                    {this.getControls()}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
