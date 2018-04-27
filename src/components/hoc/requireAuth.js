import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ERROR, SUCCESS } from '../../state/statusTypes';

export default function (ComposedComponent, FailedComponent) {
    const mapStateToProps = state => ({
        isLoggedIn: _.get(state, 'user.Status', ERROR) === SUCCESS
    });

    class Authentication extends Component {
        renderFailedAuth() {
            return <FailedComponent {...this.props} />;
        }

        render() {
            if (!this.props.isLoggedIn) {
                console.log('nope');
                return this.renderFailedAuth();
            }
            console.log('yup');
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(mapStateToProps)(Authentication);
}
