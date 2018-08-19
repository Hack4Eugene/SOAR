import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import Card from '../../lib/Card';

import { loginUser, logoutUser } from '../../../state/actions/index.js';

const mapStateToProps = (state) => ({
    isLoggedIn: !_.get(state, 'authentication.isTokenExpired', false) && _.get(state, 'authentication.isLoggedIn', false),
});

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
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

    handleUsernameChange = e => {
        this.setState({ username: this.refs.username.value });
    };

    handlePasswordChange = e => {
        console.log(this.refs.password.value);
        this.setState({ password: this.refs.password.value });
    };

    login = () => {
        const {
            username,
            password
        } = this.state;

        this.props.loginUser({ username, password });
    };

    renderForm() {
        return (
            <Card>
                <div className="card-body" onKeyPress={this.onKeyPress}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            ref="username"
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            ref="password"
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.login}>Submit</button>
                </div>
            </Card>
        );
    }

    render() {
        if (this.props.returnURL && this.props.isLoggedIn) return <Redirect to={this.props.returnURL} />;
        if (this.props.isLoggedIn) return <Redirect to="/" />;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2 className="ml-3">Login</h2>
                    </div>
                    <div className="col-3" />
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        {this.renderForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { loginUser, logoutUser })(LoginPage);
