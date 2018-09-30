import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getProjects } from '../../../../state/actions/projectActions';
import { SUCCESS } from '../../../../state/statusTypes';

const mapStateToProps = state => ({
    projects: _.orderBy(_.get(state, 'projects.data', []), 'name'),
    projectStatus: _.get(state, 'projects.status')
});

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

    render() {
        if (this.props.projectStatus !== SUCCESS) return <div>Loading...</div>;

        return (
            <div className="" style={{ margin: '0 auto', width: '75%' }}>
                <form className="d-flex flex-column" onSubmit={this.props.handleSubmit}>
                    <CustomField
                        label="Name"
                        name="name"
                        component="input"
                        type="text"
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
                        label="Project"
                        name="project"
                    >
                        <option>Project...</option>
                        {_.map(this.props.projects, project => (
                            <option value={project._id} key={project._id}>{project.name}</option>
                        ))}
                    </CustomSelect>
                    <button className="mt-3 btn btn-primary" type="submit">Submit Edits</button>
                </form>
            </div>
        );
    }
}

const CustomField = props => {
    return (
        <Fragment>
            <label>{props.label}</label>
            <Field {...props} className="form-control mb-2" />
        </Fragment>
    );
};

const CustomSelect = props => {
    console.log(props);
    return (
        <Fragment>
            <label>{props.label}</label>
            <Field {...props} name={props.name} component="select" className="form-control mb-2">
                {props.children}
            </Field>
        </Fragment>
    );
};

EditEvent = connect( //eslint-disable-line no-class-assign
    mapStateToProps,
    { getProjects }
)(EditEvent);

export default reduxForm({
    form: 'EditEvent',
    enableReinitialize: true
})(EditEvent);
