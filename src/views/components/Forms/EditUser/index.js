import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SUCCESS, ERROR } from '../../../../state/statusTypes';

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    showError() {
        const { updateOrgStatus, createOrgStatus, selectedOrg } = this.props;

        if (updateOrgStatus === ERROR || createOrgStatus === ERROR) {
            const errorMessage = _.get(selectedOrg, 'error.response.data.message', '');

            return (
                <p className="mt-3 mb-0 text-danger">
                    {errorMessage}
                </p>
            );
        }
    }

    render() {
        return (
            <div>
                <form className="d-flex flex-column" onSubmit={this.props.handleSubmit}>
                    <CustomField
                        label="Username"
                        name="username"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Full Name"
                        name="name"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Email"
                        name="email"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Website"
                        name="website"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Location"
                        name="location"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Phone Number"
                        name="phoneNumber"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="About Me"
                        name="description"
                        component="textarea"
                        type="text"
                        rows={3}
                    />
                    <button className="mt-3 btn btn-primary" type="submit">Submit</button>
                    {/* {this.showError()} */}
                </form>
            </div>
        );
    }
}

const CustomField = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <Field {...props} className="form-control" />
        </div>
    );
};

const mapStateToProps = state => ({
    user: _.get(state, 'user.data', {})
});

EditUser = connect(mapStateToProps)(EditUser);

export default reduxForm({
    form: 'EditUser',
    enableReinitialize: true
})(EditUser);
