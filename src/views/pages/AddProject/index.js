import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get, cloneDeep } from 'lodash';

import Card from '../../lib/Card';
import { SUCCESS } from '../../../state/statusTypes';
import { getProjectById, createProject } from '../../../state/actions/projectActions';
import { getOrganizations } from '../../../state/actions/organizationActions';
import EditProject from '../../components/Forms/EditProject';

class AddProject extends Component {
    componentDidMount() {
        this.props.getOrganizations();
    }

    submitProject = () => {
        const values = get(this.props.form, 'values', {});
        this.props.createProject(values);
    }

    renderForm() {
        return (
            <Card>
                <div className="card-body">
                    <EditProject onSubmit={this.submitProject} />
                </div>
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
            <div className="container">                    
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2 className="ml-3">Add Project</h2>
                    </div>
                    <div className="col-3">
                        <Link to="/">
                            <button
                                type="button" 
                                className="btn btn-success float-right" 
                                data-toggle="modal" 
                                data-target="#exampleModal"
                            >
                                Back to Projects
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        {this.renderForm()}          
                    </div>                  
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status'),
    selectedProject: _.get(state, 'projects.selectedProject'),
    createProjectStatus: _.get(state, 'projects.selectedProject.status.create'),
    form: get(state, 'form.EditProject')
});

export default connect(mapStateToProps, { createProject, getOrganizations })(AddProject);
