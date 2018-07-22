import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import LoginPage from '../pages/Login';

const mapStateToProps = state => ({
    isLoggedIn: _.get(state, 'authentication.isLoggedIn'),
    isTokenExpired: moment.utc().isAfter(moment.utc(_.get(state, 'authentication.isTokenExpired')))
});

class PrivateRoute extends Component {
    render() {
        const { component: Component, isLoggedIn, isTokenExpired } = this.props;

        const validSession = isLoggedIn && !isTokenExpired;
        return(
            <div>
                {validSession
                    ? <Component {...this.props}/>
                    : <LoginPage returnURL={this.props.path} />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(PrivateRoute));
