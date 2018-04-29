import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import LoginPage from '../pages/LoginPage';

const mapStateToProps = state => ({
    isLoggedIn: _.get(state, 'authentication.isLoggedIn'),
    isTokenExpired: moment.utc().isAfter(moment.utc(_.get(state, 'authentication.isTokenExpired')))
});

class PrivateRoute extends Component {
    render() {
        const { component: Component, isLoggedIn, isTokenExpired } = this.props;

        return(
            <div>
                {!isLoggedIn || isTokenExpired
                    ? <LoginPage returnURL={this.props.path} />
                    : (
                        <Component {...this.props}/>
                    )
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(PrivateRoute));
