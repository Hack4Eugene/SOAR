import React, { Component } from 'react';
import { connect } from 'react-redux';
import _, { get, map } from 'lodash';

import ToolBar from '../../lib/ToolBar';
import Modal from '../../lib/Modal';
import EditOrganization from '../../components/Forms/EditOrganization';

import { getOrganizationsById } from '../../../state/actions/organizationActions';
import { getProjectsByOrganization } from '../../../state/actions/projectActions';

import '../UserProfile/UserProfilePage.scss';

class ProjectItem extends Component {
    render() {
        const truncatedDescription = _.truncate(this.props.description, {
            length: 200,
            separator: /,? +/
        });
        return (
            <div className="card m-3" style={{ maxWidth: '300px' }}>
                <div className="card-header">
                    <h5 className="card-title mb-0">{this.props.title}</h5>
                </div>
                <div className="card-body" style={{ maxHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p className="card-text">{truncatedDescription}</p>
                    <a href={`/project/${this.props.id}`} className="btn btn-outline-success d-flex" style={{ marginLeft: 'auto', maxWidth: '99px' }}>More Info</a>
                </div>
            </div>
        );
    }
}

class OrganizationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationID: this.props.computedMatch.params.id,
            showEditOrgModal: false
        };
    }

    componentDidMount() {
        this.props.getOrganizationsById([this.state.organizationID]);
        this.props.getProjectsByOrganization(this.state.organizationID);
    }

    accessToEntity(entity) {
        const userOrganizations = _.get(this.props.user, 'organizations', []);
        const organizationsByIDs = _.map(userOrganizations, 'id');

        return _.includes(organizationsByIDs, entity);
    }

    showProjects() {
        if (this.props.projectsStatus === 'OK') {
            if (this.props.projects.length === 0) {
                const userHasAccess = this.accessToEntity(this.state.organizationID);
                return (
                    <div className="jumbotron jumbotron-fluid p-4">
                        <div className="container">
                            <h3 className="display-5">This organization doesn't have any projects yet.</h3>
                            {userHasAccess ? <a href="#" className="btn btn-outline-success d-flex" style={{ margin: 'auto', width: '160px' }}>Create New Project</a> : null}
                        </div>
                    </div>
                );
            }

            const ProjectList = this.props.projects.length
                ? map(this.props.projects, (project, i) => <ProjectItem key={i} title={project.name} description={project.description} id={project._id} />)
                : <div />;

            return ProjectList;
        }

        return (
            <div className="col-8">
                <h4>Loading...</h4>
            </div>
        );
    }

    showTags() {
        const tagList = [];
        const badgeList = ['badge-success', 'badge-warning', 'badge-primary', 'badge-danger'];

        _.forEach(this.props.organization.tags, tag => {
            const randomIndex = Math.floor(Math.random() * badgeList.length);
            const dynamicClassName = `align-self-center badge badge-pill ${badgeList[randomIndex]} mr-2`;
            tagList.push(<span className={dynamicClassName} key={tag}>{tag}</span>);
        });

        if (tagList.length > 0) {
            return (
                <div>
                    <p className="lead">
                        Are you interested in joining our organization? We're looking for individuals with the following skills and interests:
                    </p>
                    {tagList}
                </div>
            );
        }
        return (
            <p className="lead">Are you interested in joining our organization?</p>
        );
    }

    submitEdits = () => {
        const updates = _.get(this.props.form, 'values', {});
        this.props.updateProject(this.props.project._id, updates);
    };

    render() {
        return (
            <div className="container">
                <Modal 
                    show={this.state.showEditOrgModal} 
                    hide={() => this.setState({ showEditOrgModal: !this.state.showEditOrgModal })}
                >
                    <EditOrganization
                        initialValues={this.props.organization}
                        onSubmit={this.submitEdits}
                    />
                </Modal>
                <div className="jumbotron p-4">
                    <ToolBar onEdit={() => this.setState({ showEditOrgModal: !this.state.showEditOrgModal })}>
                        <h1 className="display-4">{this.props.organization.name}</h1>
                    </ToolBar>
                    <p className="lead">{this.props.organization.tagline || ''}</p>
                    <hr className="my-4" />
                    <p>{this.props.organization.description || ''}</p>
                    <hr className="my-4" />
                    <input className="form-control form-control-lg" type="text" placeholder="Filter projects by tag..." />
                </div>
                <div className="container">
                    <h2 className="display-4">Projects</h2>
                    <div className="d-flex flex-row flex-wrap justify-content-start">
                        {this.showProjects()}
                    </div>
                </div>
                <div className="jumbotron jumbotron-fluid p-4" style={{ marginTop: '2rem' }}>
                    <div className="container">
                        <h1 className="display-4">Lend a hand! ✋</h1>
                        <div className="d-flex flex-wrap justify-content-between">
                            {this.showTags()}
                            <button type="button" className="btn btn-outline-success float-right align-self-center">Join Now</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    posts: get(state, 'posts', {}),
    user: get(state, 'user', {}),
    organization: get(state, 'organizations.organizationsById[0]', {}),
    projects: get(state, 'projects.projectsForOrganization.data', []),
    projectsStatus: get(state, 'projects.projectsForOrganization.statusText', 'NOT_STARTED'),
    form: _.get(state, 'form.EditOrganization')
});

export default connect(mapStateToProps, { getOrganizationsById, getProjectsByOrganization })(OrganizationPage);
