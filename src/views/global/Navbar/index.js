import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';

import { HamburgerMenu } from '../HamburgerMenu';
import Sidebar from '../Sidebar';

import logo from '../../../static/imgs/ecan_logo.png';
import avatar from '../../../static/imgs/user-image.png';
import './styles.scss';

const mapStateToProps = state => ({
    isLoggedIn: _.get(state, 'authentication.isLoggedIn', false),
    userName: _.get(state, 'user.name', null)
});

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSidebarOpen: false
        };
    }

    getNavigationLinks = () => (
        <div className="navbar mr-5">
            <div className="navbar-nav">
                <Link className="text-success mr-4" to="/">
                    <button type="button" className="btn btn-light">Projects</button>
                </Link>
                <Link className="text-success mr-4" to="/events">
                    <button type="button" className="btn btn-light">Events</button>
                </Link>
                <Link className="text-success mr-4" to="/explore">
                    <button type="button" className="btn btn-light">Explore</button>
                </Link>
                <Link className="text-success mr-4" to="/profile">
                    <button type="button" className="btn btn-light">Profile</button>
                </Link>
            </div>
        </div>
    );

    getControls = () => {
        const isLoggedIn = this.props.isLoggedIn;

        return !isLoggedIn
            ? (
                <Fragment>
                    <Link className="text-success" to="/adduser">
                       <button type="button" className="btn btn-outline-success btn-lg mr-2">New User</button>
                    </Link>
                    <Link className="text-primary" to="/login">
                        <button className="btn btn-outline-primary btn-lg ml-2">Login</button>
                    </Link>
                </Fragment>
               ) : <Link className="text-primary" to="/logout"><button className="btn btn-outline-primary btn-md">Logout</button></Link>;
    };

    getUserAvatar = () => (
        <Link to="./userprofile" style={{ flexShrink: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img alt="ECAN SOAR Avatar" src={avatar} style={{ width: '100%', maxWidth: '58px' }} />
            <p style={{ color: 'black', margin: '0 0 0 8px' }}>{this.props.userName}</p>
        </Link>
    );

    handleClick = () => {
        this.setState({ isSidebarOpen: !this.state.isSidebarOpen }, () => console.log(this.state));
    };

    render() {
        const {
            props,
            state,
            handleClick
        } = this;

        const {
            isSidebarOpen
        } = state;

        const {
            isMobile
        } = props;

        const mobileClasses = 'justify-content-center';

        return (
            <div>
                <Sidebar open={isSidebarOpen} />
                <nav
                    className={
                        classNames('navbar navbar-white border-bottom mb-4 p-0 justify-content-center',
                            { [mobileClasses]: isMobile }
                        )
                    }
                >
                    <HamburgerMenu clickFn={handleClick} open={isSidebarOpen} isMobile={isMobile} />
                    <div className="navbar-brand">
                        <img src={logo} alt="ECAN Logo" width="150" height="150" className="d-inline-block float-left" />
                    </div>
                    {!isMobile && (
                        <div className="d-flex align-items-center">
                            {this.getNavigationLinks()}
                            {this.props.isLoggedIn && this.getUserAvatar()}
                            {this.getControls()}
                        </div>
                    )}
                </nav>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navbar);
