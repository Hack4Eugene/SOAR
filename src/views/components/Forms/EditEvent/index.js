import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getProjects } from '../../../../state/actions/projectActions';
import { SUCCESS, ERROR } from '../../../../state/statusTypes';

class EditEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        this.props.getProjects();
    }

    showError() {
        const { updateEventStatus, createEventStatus, selectedEvent } = this.props;

        if (updateEventStatus === ERROR || createEventStatus === ERROR) {
            const errorMessage = _.get(selectedEvent, 'error.response.data.message', '');

            return (
                <p className="mt-3 mb-0 text-danger">
                    {errorMessage}
                </p>
            );
        }
    }

    render() {
        if (this.props.projectStatus !== SUCCESS) return <div>Loading...</div>;

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
                        label="Date"
                        name="date"
                        component="input"
                        type="datetime-local"
                    />
                    <CustomField
                        label="Location"
                        name="location"
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
                    <CustomField
                        label="Additional details"
                        name="details"
                        component="textarea"
                        type="text"
                        rows={4}
                    />
                    <CustomSelect
                        label="Project"
                        name="projectId"
                    >
                        <option>Project...</option>
                        {_.map(this.props.projects, project => (
                            <option value={project._id} key={project._id}>{project.name}</option>
                        ))}
                    </CustomSelect>
                    <CustomField
                        label="Tags"
                        name="tags"
                        component="input"
                        type="text"
                        normalize={value => value.split(',')}
                    />
                    <CustomField
                        label="Goals"
                        name="goals"
                        component="input"
                        type="text"
                        normalize={value => value.split(',')}
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
    projects: _.orderBy(_.get(state, 'projects.data', []), 'name'),
    projectStatus: _.get(state, 'projects.status'),
    selectedEvent: _.get(state, 'events.selectedEvent'),
    createEventStatus: _.get(state, 'events.selectedEvent.status.create'),
    updateEventStatus: _.get(state, 'events.selectedEvent.status.update')
});

EditEvent = connect(mapStateToProps, { getProjects })(EditEvent);

export default reduxForm({
    form: 'EditEvent',
    enableReinitialize: true
})(EditEvent);
