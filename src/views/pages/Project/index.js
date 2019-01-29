import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { getProjectById, updateProject } from '../../../state/actions/projectActions';
import { getOrganizations } from '../../../state/actions/organizationActions';
import { getEventsById } from '../../../state/actions/eventActions';
import { NOT_STARTED, SUCCESS } from '../../../state/statusTypes';

import ToolBar from '../../lib/ToolBar';
import Modal from '../../lib/Modal';
import EditProject from '../../components/Forms/EditProject';

import parkImg from '../../../static/imgs/food.jpg';
import foodLaneImg from '../../../static/imgs/food-lane-county.jpg';
import peaceImg from '../../../static/imgs/peace-corps.jpg';
import habitatImg from '../../../static/imgs/habitat-humanity.png';

import './ProjectPage.scss';
import Timeline from './timeline';

class Project extends Component {
    constructor(props) {
        super(props);
        this.lastRender = moment()
        this.state = {
            filteredEvents: props.events,
            showEditProjectModal: false
        };
    }

    componentDidMount() {
        const projectID = _.get(this.props, 'computedMatch.params.id', 'projectID');
        this.props.getProjectById(projectID);
        this.props.getOrganizations();
    }

    componentDidUpdate(prevProps, prevState) {
        const isModalShown = this.state.showEditProjectModal;
        const isNewProjectData = prevProps.project !== this.props.project;
        const isNewDataFinal = this.props.updateProjectStatus === SUCCESS;

        if (isModalShown && isNewProjectData && isNewDataFinal) {
            this.setState({ showEditProjectModal: false });
        }
    }

    showAlliance = () => {
        const { alliance_data: allianceData } = this.props.project;
        if (!allianceData || allianceData.length < 1) {
            return <h3 className="display-5">This project doesn't have any allies yet.</h3>;
        }

        const OrganizationList = allianceData.length
            ? _.map(allianceData, (ally, i) => <OrganizationItem key={i} title={ally.name} id={ally._id} />)
            : <div />;

        return OrganizationList;
    };

    submitEdits = () => {
        const updates = _.get(this.props.form, 'values', {});
        this.props.updateProject(this.props.project._id, updates);
    };

    showAccomplishments() {
        const eventRecords = this.props.projectEvents;
        let eventsWithGoals = [];

        _.map(eventRecords, event => {
            if (!_.isEmpty(event.goals)) {
                eventsWithGoals.push({
                    name: event.name,
                    goals: event.goals
                })
            }
        });

        const renderGoalsList = events => (
            _.map(events, (event, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                    <p style={{ textDecoration: 'underline' }}>{event.name}</p>
                    {_.map(event.goals, (goal, i) => (
                        <li key={i} style={{ marginLeft: '20px' }}>{goal.text}</li>
                    ))}
                </div>
            ))
        );

        return (
            <div className="card" style={{ margin: '50px 0' }}>
                <div className="card-header"><h2>Our Accomplishments</h2></div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {
                            !_.isEmpty(eventsWithGoals) 
                            ? renderGoalsList(eventsWithGoals)
                            : <p>There are no goals for this project.</p>
                        }
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        const { organizations, organizationStatus, getProjectStatus } = this.props;
        const {
            name,
            description,
            details,
            organization
        } = this.props.project;

        const host = _.find(organizations, org => org._id === organization);

        const project = _.mapValues(this.props.project, (value, key) => {
            if (key === 'startDate' || key === 'endDate') {
                return moment(value).format('YYYY-MM-DD')
            }
            return value
        })

        if (organizationStatus !== SUCCESS || getProjectStatus !== SUCCESS) return <div>Loading...</div>;

        return (
            <div className="container pt-4">
                <Modal 
                    show={this.state.showEditProjectModal} 
                    hide={() => this.setState({ showEditProjectModal: !this.state.showEditProjectModal })}
                >
                    <EditProject
                        initialValues={project}
                        onSubmit={this.submitEdits}
                    />
                </Modal>
                <div className="row">
                    <div className="col">
                        <div className="jumbotron p-4 project-jumbo">
                            <ToolBar onEdit={() => this.setState({ showEditProjectModal: !this.state.showEditProjectModal })}>
                                <h1 className="display-4">{name}</h1>
                            </ToolBar>
                            <p><i>Hosted By: {host && host.name}</i></p>

                            <p className="lead">{description}</p>
                            <hr className="my-4" />

                            <img alt="park" src={parkImg} className="project-header-img" />
                            <hr className="my-4" />

                            <p>{details}</p>

                            <h1 className="display-4 alliance-header">- Our Alliance -</h1>
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                {this.showAlliance()}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="timeline">
                    <Timeline events={this.props.project.eventRecords} />
                </section>
                {this.showAccomplishments()}
            </div>
        );
    }
}

const OrganizationItem = props => {
    return (
        <div className="card m-2" style={{ maxWidth: '250px', display: 'flex', justifyContent: 'space-between' }}>
            <div className="card-header" style={{ minHeight: 80 }}>
                <h5 className="card-title mb-0">{props.title}</h5>
            </div>

            <img alt={props.title} className="card-image card-org-image" src={foodLaneImg} />
            <div className="card-body org-card-body">
                <Link className="btn btn-outline-success org-card-button" to={`/organization/${props.id}`}>
                    Go to organization
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    project: _.get(state, 'projects.selectedProject.data', {}),
    getProjectStatus: _.get(state, 'projects.selectedProject.status.get'),
    updateProjectStatus: _.get(state, 'projects.selectedProject.status.update'),
    organizations: _.get(state, 'organizations.data', {}),
    organizationStatus: _.get(state, 'organizations.status', NOT_STARTED),
    projectEvents: _.get(state, 'projects.selectedProject.data.eventRecords', []),
    form: _.get(state, 'form.EditProject')
});

const mapDispatchToProps = {
    getProjectById, 
    updateProject, 
    getOrganizations, 
    getEventsById
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
