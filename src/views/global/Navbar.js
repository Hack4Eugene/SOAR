import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/imgs/ecan_logo.png';
import avatar from '../../static/imgs/user-image.png';

import './styles.scss';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-white border-bottom mb-4">
                <div className="navbar-brand">
                    <img src={logo} alt="ECAN Logo" width="150" height="150" className="d-inline-block float-left"/>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
                <Link className="text-success" to="/adduser">
                    <button type="button" className="btn btn-outline-success btn-lg float-right mr-2">New User</button>
                </Link>
                <Link className="text-primary" to="/login">
                    <button type="button" className="btn btn-outline-primary btn-lg float-right ml-2">Login</button>
                </Link>
                <Link to="./userprofile" style={{ 'flex': 0.5 }}><img src={avatar} style={{ 'width': '50%' }}/></Link>
            </nav>

        )
    }
}

export default Navbar;
