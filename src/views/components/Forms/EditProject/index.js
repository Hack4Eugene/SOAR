import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getOrganizations } from '../../../../state/actions/organizationActions';
import { SUCCESS, ERROR } from '../../../../state/statusTypes';

class EditProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        this.props.getOrganizations();
    }

    showError() {
        const { updateProjectStatus, createProjectStatus, selectedProject } = this.props;

        if (updateProjectStatus === ERROR || createProjectStatus === ERROR) {
            const errorMessage = _.get(selectedProject, 'error.res.data.message', '');

            return (
                <p className="mt-3 mb-0 text-danger">
                    {errorMessage}
                </p>
            );
        }
    }

    render() {
        if (this.props.organizationStatus !== SUCCESS) return <div>Loading...</div>;

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
                        label="Start date"
                        name="startDate"
                        component="input"
                        type="date"
                    />
                    <CustomField
                        label="End date"
                        name="endDate"
                        component="input"
                        type="date"
                    />
                    <CustomField
                        label="Short description"
                        name="description"
                        component="textarea"
                        type="text"
                        rows={3}
                    />
                    <CustomField
                        label="Additional details"
                        name="details"
                        component="textarea"
                        type="text"
                        rows={4}
                    />
                    <CustomSelect
                        label="Organization"
                        name="organizationId"
                    >
                        <option>Organization...</option>
                        {_.map(this.props.organizations, org => (
                            <option value={org._id} key={org._id}>{org.name}</option>
                        ))}
                    </CustomSelect>
                    <CustomSelect
                        label="Alliance"
                        name="alliance"
                        multiple
                    >
                        <option>Alliance...</option>
                        {_.map(this.props.organizations, org => (
                            <option value={org._id} key={`${org._id}-alliance`}>{org.name}</option>
                        ))}
                    </CustomSelect>
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

const CustomSelect = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <Field {...props} name={props.name} component="select" className="form-control">
                {props.children}
            </Field>
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

EditProject = connect(mapStateToProps, { getOrganizations })(EditProject);

export default reduxForm({
    form: 'EditProject',
    enableReinitialize: true
})(EditProject);
