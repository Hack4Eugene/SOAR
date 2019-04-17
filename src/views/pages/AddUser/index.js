import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import EditUser from '../../components/Forms/EditUser';
import { createUser } from '../../../state/actions/userActions';
import { SUCCESS, NOT_STARTED, ERROR } from '../../../state/statusTypes';

import './AddUser.scss';

class AddUser extends Component {
    submitUser = () => {
        const values = _.get(this.props.form, 'values', {});
        this.props.createUser(values);
    }

    renderForm() {
        return (
            <Card>
                <Card.Body>
                    <EditUser 
                        newUser
                        onSubmit={this.submitUser} 
                    />
                </Card.Body>
            </Card>
        );
    }

    render() {
        const shouldRedirect = this.props.createUserStatus === SUCCESS;

        if (shouldRedirect) {
            return <Redirect to={`/profile`} />
        }

        return (
            <div className="add-user-page">
                <div className="add-user-header">
                    <h2>New User</h2>
                </div>
                {this.renderForm()}          
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: _.get(state, 'user', {}),
    events: _.get(state, 'events', {}),
    posts: _.get(state, 'posts', {}),
    organizations: _.get(state, 'organizations', {}),
    form: _.get(state, 'form.EditUser'),
    createUserStatus: _.get(state, 'user.status.create'),
});

export default connect(mapStateToProps, { createUser })(AddUser);
