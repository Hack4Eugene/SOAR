import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Validators, { required } from 'redux-form-validators';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Input, TextArea, Select, SelectMultiple } from './utils/FormFields';
import { getOrganizations } from '../../../state/actions/organizationActions';
import { SUCCESS, ERROR } from '../../../state/statusTypes';

Object.assign(Validators.defaultOptions, {
    allowBlank: true
})

class EditProject extends Component {
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
            <Form onSubmit={this.props.handleSubmit}>
                <Field
                    label="Name*"
                    name="name"
                    component={Input}
                    type="text"
                    validate={required()}
                />
                <Field
                    label="Organization*"
                    name="organizationId"
                    component={Select}
                    validate={required()}
                >
                    <option>Choose...</option>
                    {_.map(this.props.organizations, org => (
                        <option value={org._id} key={org._id}>{org.name}</option>
                    ))}
                </Field>
                <Field
                    label="Description"
                    name="description"
                    component={TextArea}
                    rows={3}
                />
                <Field
                    label="Alliance"
                    name="alliance"
                    component={SelectMultiple}
                >
                    <option>Choose multiple...</option>
                    {_.map(this.props.organizations, org => (
                        <option value={org._id} key={`${org._id}-alliance`}>{org.name}</option>
                    ))}
                </Field>
                <div className="submit-row">
                    <Button type="submit">Submit</Button>
                    <small>* Required</small>
                </div>
                {this.showError()}
            </Form>
        );
    }
}

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
