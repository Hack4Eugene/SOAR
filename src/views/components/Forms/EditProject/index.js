import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getOrganizations } from '../../../../state/actions/organizationActions';
import { SUCCESS } from '../../../../state/statusTypes';

const mapStateToProps = state => ({
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status')
});

class EditProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    render() {
        console.log('EDIT this.props.initialValues', this.props.initialValues)
        if (this.props.organizationStatus !== SUCCESS) return <div />;

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
                        label="Tagline"
                        name="tagline"
                        component="textarea"
                        type="text"
                        rows={2}
                    />
                    <CustomField
                        label="Description"
                        name="description"
                        component="textarea"
                        type="text"
                        rows={5}
                    />
                    <CustomSelect
                        label="Organization"
                        name="organization"
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

EditProject = connect( //eslint-disable-line no-class-assign
    mapStateToProps,
    { getOrganizations }
)(EditProject);

export default reduxForm({
    form: 'EditProject',
    enableReinitialize: true
})(EditProject);
