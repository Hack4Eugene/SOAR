import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import LoginPage from '../pages/LoginPage';
import { ERROR, SUCCESS } from '../../state/statusTypes';

const mapStateToProps = state => ({
    isLoggedIn: _.get(state, 'user.Status', ERROR) === SUCCESS
});

class PrivateRoute extends Component {
    renderFailedAuth() {
        return <LoginPage returnURL={this.props.path} />;
    }

    render() {
        const { component: Component } = this.props;
        if (!this.props.isLoggedIn) {
            return this.renderFailedAuth();
        }
        return <Component {...this.props} />;
    }
}

export default connect(mapStateToProps)(withRouter(PrivateRoute));
