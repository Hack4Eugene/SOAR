import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, map, chunk } from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom'

import Card from '../../lib/Card';
import ProjectCard from '../../components/Widgets/Project/index.js';
import Calendar from 'react-calendar';

import { getOrganizationsById, getProjectsByOrganization } from '../../../state/actions/index.js'

import '../UserProfile/UserProfilePage.css';
import Project from '../Project';

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    posts: get(state, 'posts', {}),
    user: get(state, 'user', {}),
    organization: get(state, 'profile.organizations.data[0]', {}),
    projects: get(state, 'projectsForOrganization.data', []),
    projectsStatus: get(state, 'projectsForOrganization.status', 'NOT_STARTED')
    // animationVal: _.get(state, 'events.animationVal', null),
    // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

class ProjectItem extends Component {
    render() {
        console.log({prop:this.props});
        return (
            <div className="card col p-0" style={{ width: '100%' }}>
                <div className="card-header">
                    <h5 className="card-title mb-0">{this.props.title}</h5>
                </div>
                <div className="card-body">

                    <p className="card-text">{this.props.description}</p>
                    <a href="#" className="btn btn-outline-success float-right">More Info</a>
                </div>
            </div>
        )
    }
}

class OrganizationPage extends Component {
    componentDidMount() {
        console.log(this.props.computedMatch.params.id);
        const organizationID = this.props.computedMatch.params.id;
        this.props.getOrganizationsById([organizationID]);
        this.props.getProjectsByOrganization(organizationID);
    }

    showProjects() {
        if (this.props.projectsStatus === 'SUCCESS') {
            console.log(this.props.projects);

            const ProjectList = this.props.projects.length
                ? map(this.props.projects, (project, i) => <ProjectItem key={i} title={project.name} description={project.description}/>)
                : <div />;

            return (
                <div>
                    {ProjectList}
                </div>
            );
        }

        return (
            <div className="col-8">
                <h4>Loading...</h4>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron p-4">
                    <h1 className="display-4">{this.props.organization.name}</h1>
                    <p className="lead">{this.props.organization.description}</p>
                    <hr className="my-4"/>
                    <p>We accomplish this by soliciting, collecting, rescuing, growing, preparing and packaging food for
                        distribution through a network of more than 150 partner agencies and distribution sites; through
                        public awareness, education and community advocacy; and through programs designed to improve the
                        ability of low-income individuals to maintain an adequate supply of wholesome, nutritious
                        food.</p>
                    {/* <p class="lead"> */}
                    <hr className="my-4"/>
                    <input className="form-control form-control-lg" type="text" placeholder="Filter projects by tag..."/>
                    {/* </p> */}
                </div>
                <div className="d-inline-flex flex-row flex-wrap justify-items-start">
                    {this.showProjects()}
                </div>
                <div className="row">
                    <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Winter Food Drive</h5>
                        </div>
                        <div className="card-body">

                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" className="btn btn-outline-success float-right">More Info</a>
                        </div>
                    </div>

                    <div className="card col ml-3 mr-3 p-0 mb-3" style={{ width: '10rem' }}>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Meal Prep Initiative</h5>
                        </div>
                        <div className="card-body">

                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" className="btn btn-outline-success float-right">More Info</a>
                        </div>
                    </div>

                    <div className="card col p-0 mr-3 mb-3" style={{ width: '10rem' }}>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Gluten Free Gardener</h5>
                        </div>
                        <div className="card-body">

                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" className="btn btn-outline-success float-right">More Info</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Frozen Food Storage</h5>
                        </div>
                        <div className="card-body">

                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" className="btn btn-outline-success float-right">More Info</a>
                        </div>
                    </div>

                    <div className="card col ml-3 mr-3 p-0 mb-3" style={{ width: '10rem' }}>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Personal Hygiene Classes</h5>
                        </div>
                        <div className="card-body">

                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" className="btn btn-outline-success float-right">More Info</a>
                        </div>
                    </div>

                    <div className="card col p-0 mr-3 mb-3" style={{ width: '10rem' }}>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Summer Hunger Fighters</h5>
                        </div>
                        <div className="card-body">

                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" className="btn btn-outline-success float-right">More Info</a>
                        </div>
                    </div>
                </div>

                <div className="jumbotron jumbotron-fluid p-4">
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
