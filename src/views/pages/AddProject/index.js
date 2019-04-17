import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get } from 'lodash';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { SUCCESS } from '../../../state/statusTypes';
import { createProject } from '../../../state/actions/projectActions';
import EditProject from '../../components/Forms/EditProject';

import './AddProject.scss';

class AddProject extends Component {
    submitProject = () => {
        const values = get(this.props.form, 'values', {});
        this.props.createProject(values);
    }

    renderForm() {
        return (
            <Card>
                <Card.Body>
                    <EditProject onSubmit={this.submitProject} />
                </Card.Body>
            </Card>
        );
    }

    redirectToCreatedProject = () => {
        const { selectedProject } = this.props;
        const projectId = _.get(selectedProject, 'data._id', '');

        return <Redirect to={`/project/${projectId}`} />
    };

    render() {
        const shouldRedirect = this.props.createProjectStatus === SUCCESS

        if (shouldRedirect) {
            return this.redirectToCreatedProject();
        }

        return (
            <div className="add-project-page">
                <div className="add-project-header">
                    <h2>Create Project</h2>
                    <Link to="/explore#projects">
                        <Button
                            type="button" 
                            variant="outline-success"
                        >
                            Back to Projects
                        </Button>
                    </Link>
                </div>
                {this.renderForm()}          
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    selectedProject: _.get(state, 'projects.selectedProject'),
    createProjectStatus: _.get(state, 'projects.selectedProject.status.create'),
    form: get(state, 'form.EditProject')
});

export default connect(mapStateToProps, { createProject })(AddProject);
