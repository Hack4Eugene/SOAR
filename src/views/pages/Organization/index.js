import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, map, chunk } from 'lodash';
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import Card from '../../lib/Card';
import ProjectCard from '../../components/Widgets/Project/index.js';
import Calendar from 'react-calendar';

// import { getOrganizationsById, getProjectsByOrganization } from '../../../state/actions/index.js'
import { getOrganizationsById } from '../../../state/actions/organizationActions';
import { getProjectsByOrganization } from '../../../state/actions/projectActions';

import '../UserProfile/UserProfilePage.css';

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    posts: get(state, 'posts', {}),
    user: get(state, 'user', {}),
    organization: get(state, 'organizations.organizationsById[0]', {}),
    projects: get(state, 'projects.projectsForOrganization.data', []),
    projectsStatus: get(state, 'projects.projectsForOrganization.statusText', 'NOT_STARTED')
    // animationVal: _.get(state, 'events.animationVal', null),
    // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

class ProjectItem extends Component {
    render() {
        const truncatedDescription = _.truncate(this.props.description, {
            'length': 200,
            'separator': /,? +/
        });
        return (
            <div className="card m-3" style={{ maxWidth: '300px' }}>
                <div className="card-header">
                    <h5 className="card-title mb-0">{this.props.title}</h5>
                </div>
                <div className="card-body" style={{ maxHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p className="card-text">{truncatedDescription}</p>
                    <a href={`/project/${this.props.id}`} className="btn btn-outline-success d-flex" style={{marginLeft: 'auto', maxWidth: '99px'}}>More Info</a>
                </div>
            </div>
        );
    }
}

class OrganizationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationID: this.props.computedMatch.params.id
        }
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
                            {userHasAccess ? <a href='#' className="btn btn-outline-success d-flex" style={{ margin: 'auto', width: '160px' }}>Create New Project</a> : null}
                        </div>
                    </div>
                )
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

    render() {
        return (
            <div className="container">
                <div className="jumbotron p-4">
                    <h1 className="display-4">{this.props.organization.name}</h1>
                    <p className="lead">{this.props.organization.tagline || ''}</p>
                    <hr className="my-4" />
                    <p>{this.props.organization.description || ''}</p>
                    {/* <p class="lead"> */}
                    <hr className="my-4" />
                    <input className="form-control form-control-lg" type="text" placeholder="Filter projects by tag..." />
                    {/* </p> */}
                </div>
                <div className="d-flex flex-row flex-wrap" style={{justifyContent: 'center'}}>
                    {this.showProjects()}
                </div>
                <div className="jumbotron jumbotron-fluid p-4" style={{marginTop: '2rem'}}>
                    <div className="container">
                        <h1 className="display-4">Lend a hand! ✋</h1>
                        <p className="lead">Are you interested in joining our organization? We're looking for individuals
                            with the following skills and interests:</p>
                        <span className="badge badge-pill badge-success mr-2">Cooks</span>
                        <span className="badge badge-pill badge-success mr-2">Drivers</span>
                        <span className="badge badge-pill badge-warning mr-2">Shift Managers</span>
                        <span className="badge badge-pill badge-primary mr-2">Night Owls</span>
                        <span className="badge badge-pill badge-success mr-2">Elder Caregivers</span>
                        <span className="badge badge-pill badge-danger mr-2">Artists</span>
                        <span className="badge badge-pill badge-primary mr-2">STEM Advocates</span>

                        <button type="button" className="btn btn-outline-success float-right">Join Now</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { getOrganizationsById, getProjectsByOrganization })(OrganizationPage);
