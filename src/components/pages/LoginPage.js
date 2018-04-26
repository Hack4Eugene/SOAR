import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter } from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom'

import Card from '../Card';
import Calendar from 'react-calendar';

import { loginUser } from '../../state/actions/index.js'

const mapStateToProps = (state) => ({
    user: get(state, 'user', {})
});

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    login = () => {
        console.log(this.state);
        const {
            username,
            password
        } = this.state;

        console.log(`this.props.loginUser(username: ${username}, password: ${password})`);

        this.props.loginUser({ username, password })
    };

    handleUsernameChange = (e) => {
        this.setState({ username: this.refs.username.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: this.refs.password.value });
    };

    renderForm() {
        return (
            <Card>
                {/* <div className="card-header">{date}</div> */}
                {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
                <div className="card-body">
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
        )
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2 className="ml-3">Login</h2>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        {this.renderForm()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, { loginUser })(LoginPage);
