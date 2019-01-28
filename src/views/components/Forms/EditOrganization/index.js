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

    // showError() {
    //     const { updateProjectStatus, createProjectStatus, selectedProject } = this.props;

    //     if (updateProjectStatus === ERROR || createProjectStatus === ERROR) {
    //         const errorMessage = _.get(selectedProject, 'error.res.data.message', '');

    //         return (
    //             <p className="mt-3 mb-0 text-danger">
    //                 {errorMessage}
    //             </p>
    //         );
    //     }
    // }

    render() {
        // if (this.props.organizationStatus !== SUCCESS) return <div>Loading...</div>;

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
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status'),
    selectedProject: _.get(state, 'projects.selectedProject'),
    createProjectStatus: _.get(state, 'projects.selectedProject.status.create'),
    updateProjectStatus: _.get(state, 'projects.selectedProject.status.update')
});

EditOrganization = connect(mapStateToProps)(EditOrganization);

export default reduxForm({
    form: 'EditOrganization',
    enableReinitialize: true
})(EditOrganization);
