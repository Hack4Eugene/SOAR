import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';

import HamburgerMenu from '../HamburgerMenu';
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

        this.nav = React.createRef();
        this.hamburgerMenu = React.createRef();
        this.onClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
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

    handleClick = (e) => {
        const target = e.target;
        const navbar = this.nav.current;
        const hamburgerMenu = this.hamburgerMenu.current.container.current;
        const hamburgerMenuTouchPoints = [hamburgerMenu, ...hamburgerMenu.children, ...hamburgerMenu.children[0].children];

        const shouldOpenSidebar = _.includes(hamburgerMenuTouchPoints, target);
        const isTargetChildOfSidebar = navbar.firstChild === target;

        //Prevent clicking the page from opening menu
        if (!this.state.isSidebarOpen && !shouldOpenSidebar) {
            return;
        }

        //Ignore click target inside sidebar
        if (this.state.isSidebarOpen && isTargetChildOfSidebar) {
            return;
        }

        this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
    };

    render() {
        const {
            props,
            state
        } = this;

        const {
            isSidebarOpen
        } = state;

        const {
            isMobile
        } = props;

        const mobileNavClasses = 'justify-content-start';
        const mobileImgClasses = 'm-auto';

        return (
            <div ref={this.nav}>
                <Sidebar
                    toggleSidebarFn={() => this.setState({ isSideBarOpen: !this.state.isSidebarOpen })}
                    open={isSidebarOpen}
                    isLoggedIn={this.props.isLoggedIn}
                />
                <nav
                    className={
                        classNames('navbar navbar-white border-bottom p-0',
                            {
                                [mobileNavClasses]: isMobile,
                                'justify-content-center': !isMobile
                            }
                        )
                    }
                >
                    <HamburgerMenu open={isSidebarOpen} isMobile={isMobile} ref={this.hamburgerMenu} />
                    <img
                        src={logo} alt="ECAN Logo"
                        style={{ flex: '0 0 100px', maxWidth: '100px' }}
                        className={classNames({ [mobileImgClasses]: isMobile })}
                    />
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
