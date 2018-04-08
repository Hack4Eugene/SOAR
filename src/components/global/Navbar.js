import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/imgs/ecan_logo_trans.png';

import './styles.scss';

class Navbar extends Component {
    render() {
        return (

            <nav class="navbar navbar-inverse navbar-static-top" role="navigation">
                 <a class="navbar-brand"><img src={logo} alt="ECAN Logo" width="150" height="150" className="d-inline-block float-left" /></a>

                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                   </div>

                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/">Projects</Link></button>
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/events">Events</Link></button>
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/explore">Explore</Link></button>
                            <button type="button" class="btn btn-light mx-2 mt-5"><Link class="text-success" to="/profile">Profile</Link></button>
                        </ul>
                    </div>
                
                <button type="button" class="btn btn-outline-success btn-lg float-right mt-5 mr-5"><Link class="text-success" to="/login">Login</Link></button>
                
            </nav>

        )
    }
}

export default Navbar;
