import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/imgs/ecan_logo_trans.png';

import './styles.scss';

class Navbar extends Component {
    render() {
        return (

            <nav class="navbar navbar-expand-lg navbar-white border-bottom mb-4">
                  <div class="navbar-brand"><img src={logo} alt="ECAN Logo" width="150" height="150" className="d-inline-block float-left"/></div>
                  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/">Projects</Link></button>
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/events">Events</Link></button>
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/explore">Explore</Link></button>
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/profile">Profile</Link></button>
                        </div>
                  </div>
                  <Link class="text-success" to="/adduser"><button type="button" class="btn btn-outline-success btn-lg float-right mt-5 mr-0">New User</button></Link>
                  <Link class="text-primary" to="/login"><button type="button" class="btn btn-outline-primary btn-lg float-right mt-5 mr-5">Login</button></Link>
           </nav>

        )
    }
}

export default Navbar;
