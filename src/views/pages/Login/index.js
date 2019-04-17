import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { loginUser, logoutUser } from '../../../state/actions/authenticationActions';
import './Login.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            logout: null
        };
    }

    componentDidMount() {
        if (this.props.expireSession && !this.state.logout) {
            this.props.logoutUser();
        }
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.login();
        }
    };

    getErrorMessage = () => {
        if (_.get(this.props.authentication, 'error.message', null) === null) {
            return 'Login attempt failed.';
        }
        return this.props.authentication.error.message;
    };

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    login = () => {
        const {
            email,
            password
        } = this.state;

        this.props.loginUser({ email, password });
    };

    renderError() {
        if (this.props.authentication.status === 'ERROR') {
            return (
                <Alert variant="danger">
                    {this.getErrorMessage()}
                </Alert>
            )
        }
    }

    renderForm() {
        return (
            <Card>
                <Card.Body onKeyPress={this.onKeyPress}>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email">email</Form.Label>
                            <Form.Control
                                type="text"
                                id="email"
                                ref="email"
                                onChange={this.handleEmailChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                ref="password"
                                onChange={this.handlePasswordChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={this.login}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    render() {
        if (this.props.returnURL && this.props.isLoggedIn) return <Redirect to={this.props.returnURL} />;
        if (this.props.isLoggedIn) return <Redirect to="/explore" />;

        return (
            <div className="login-page">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                {this.renderError()}
                {this.renderForm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: !_.get(state, 'authentication.isTokenExpired', false) && _.get(state, 'authentication.isLoggedIn', false),
    authentication: _.get(state, 'authentication', {})
});

export default connect(mapStateToProps, { loginUser, logoutUser })(LoginPage);
