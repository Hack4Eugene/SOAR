import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SUCCESS, ERROR } from '../../../../state/statusTypes';

class EditOrganization extends Component {
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
                        label="Name"
                        name="name"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Street address"
                        name="address.street"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="City"
                        name="address.city"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="State"
                        name="address.state"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Zip code"
                        name="address.zipcode"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Country"
                        name="address.country"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Phone number"
                        name="contactInformation.phoneNumber"
                        component="input"
                        type="text"
                    />
                    <CustomField
                        label="Email"
                        name="contactInformation.email"
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
                        label="Short description"
                        name="description"
                        component="textarea"
                        type="text"
                        rows={3}
                    />
                    <button className="mt-3 btn btn-primary" type="submit">Submit</button>
                    {this.showError()}
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
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status'),
    selectedOrg: _.get(state, 'organizations.selectedOrg'),
    createOrgStatus: _.get(state, 'organizations.selectedOrg.status.create'),
    updateOrgStatus: _.get(state, 'organizations.selectedOrg.status.update')
});

EditOrganization = connect(mapStateToProps)(EditOrganization);

export default reduxForm({
    form: 'EditOrganization',
    enableReinitialize: true
})(EditOrganization);
