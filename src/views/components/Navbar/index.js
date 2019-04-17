import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BootNavbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './Navbar.scss';

class Navbar extends Component {
    renderExplore() {
        return (
            <NavDropdown title="Explore">
                <NavDropdown.Item>
                    <Link to='/explore#events'>Events</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link to='/explore#projects'>Projects</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link to='/explore#organizations'>Organizations</Link>
                </NavDropdown.Item>
            </NavDropdown>
        )
    }

    renderProfileNewUser() {
        const { isLoggedIn } = this.props;
        const link = isLoggedIn ? '/profile' : '/adduser';
        const text = isLoggedIn ? 'My profile' : 'New user';

        return (
            <Link to={link}>
                <Button variant="outline-success">{text}</Button>
            </Link>
        );
    }

    renderLoginLogout() {
        const { isLoggedIn } = this.props;
        const link = isLoggedIn ? '/logout' : '/login';
        const text = isLoggedIn ? 'Logout' : 'Login';

        return (
            <Link to={link}>
                <Button variant="outline-primary">{text}</Button>
            </Link>
        );
    }

    render() {
        return (
            <BootNavbar collapseOnSelect expand="md" bg="light" variant="light">
                <Container>
                    <Link to='/'>
                        <i className="fas fa-leaf" />
                        <BootNavbar.Brand>SOAR Network</BootNavbar.Brand>
                    </Link>
                    <BootNavbar.Toggle />
                    <BootNavbar.Collapse>
                        <Nav className="mr-auto left">
                            {this.renderExplore()}
                        </Nav>
                        <hr />
                        <Nav className="right">
                            {this.renderProfileNewUser()}
                            {this.renderLoginLogout()}
                        </Nav>
                    </BootNavbar.Collapse>
                </Container>
            </BootNavbar>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: _.get(state, 'authentication.isLoggedIn', false)
});

export default connect(mapStateToProps)(Navbar);
