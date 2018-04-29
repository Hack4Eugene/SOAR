import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import LoginPage from '../pages/LoginPage';
import { ERROR, SUCCESS } from '../../state/statusTypes';

const mapStateToProps = state => ({
    isLoggedIn: _.get(state, 'user.data.auth.token'),
    isTokenExpired: moment.utc().isAfter(moment.utc(_.get(state, 'user.data.auth.expiresAt'))),
    expirationDate: _.get(state, 'user.data.auth.expiresAt'),
    auth: _.get(state, 'user.data.auth')
});

class PrivateRoute extends Component {
    isTokenExpired = () => {
        const expirationDate = moment.utc(this.props.expirationDate);
        const now = moment.utc();
        return now.isAfter(expirationDate);
    };

    render() {
        const { component: Component, auth, isLoggedIn,isTokenExpired } = this.props;

        console.log({ condition: isTokenExpired });

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
