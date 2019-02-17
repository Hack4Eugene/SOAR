import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { getProjectById, updateProject } from '../../../state/actions/projectActions';
import { getOrganizations, getOrganizationById } from '../../../state/actions/organizationActions';
import { getEventsById } from '../../../state/actions/eventActions';
import { NOT_STARTED, SUCCESS } from '../../../state/statusTypes';

import Loader from '../../global/Loader';
import Modal from '../../lib/Modal';
import EditProject from '../../components/Forms/EditProject';
import parkImg from '../../../static/imgs/food.jpg';

import './ProjectPage.scss';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredEvents: props.events,
            showEditProjectModal: false
        };
    }

    componentDidMount() {
        const projectID = _.get(this.props, 'computedMatch.params.id', 'projectID');
        this.props.getProjectById(projectID);
    }

    componentDidUpdate(prevProps, prevState) {
        const isModalShown = this.state.showEditProjectModal;
        const isNewProjectData = prevProps.project !== this.props.project;
        const isNewDataFinal = this.props.updateProjectStatus === SUCCESS;

        if (isModalShown && isNewProjectData && isNewDataFinal) {
            this.setState({ showEditProjectModal: false });
        }
    }

    submitEdits = () => {
        const updates = _.get(this.props.form, 'values', {});
        this.props.updateProject(this.props.project._id, updates);
    };

    toggleModal = () => {
        this.setState({ 
            showEditProjectModal: !this.state.showEditProjectModal 
        })
    }

    renderModal() {
        const project = _.mapValues(this.props.project, (value, key) => {
            if (key === 'startDate' || key === 'endDate') {
                return moment(value).format('YYYY-MM-DD')
            }
            return value
        })

        return (
            <Modal 
                show={this.state.showEditProjectModal} 
                hide={() => this.setState({ showEditProjectModal: !this.state.showEditProjectModal })}
            >
                <EditProject
                    initialValues={project}
                    onSubmit={this.submitEdits}
                />
            </Modal>
        );
    }

    renderHeader(name, organization, tagline) {
        const { name: orgName, _id: orgId } = organization;

        return (
            <Fragment>
                <Button 
                    variant="light"
                    className="edit-project-button"
                    onClick={this.toggleModal}
                >
                    Edit project
                </Button>
                <Jumbotron className="project-jumbotron">
                    <h1>{name}</h1>
                    <i>Project led by <Link to={`/organization/${orgId}`} style={{ textDecoration: 'underline' }}>{orgName}</Link></i>
                    <hr />
                    <p style={{ margin: 0 }}>{tagline}</p>
                </Jumbotron>
                <img alt="project-image" src={parkImg} className="project-image" />
            </Fragment>
        );
    }

    renderDetails(details) {
        if (details) {
            return (
                <Card className="project-details-card">
                    <Card.Header>
                        <h5 style={{ margin: 0 }}>Details</h5>
                    </Card.Header>
                    <Card.Body>{details}</Card.Body>
                </Card>
            );
        }
    }

    renderEvents(events) {
        if (!_.isEmpty(events)) {
            return (
                <Card className="journey-card">
                    <Card.Header>
                        <div className="header">
                            <h5 style={{ margin: 0 }}>Our Journey</h5>
                            <div>
                                <span><i className="fas fa-circle" />Past</span>
                                <span><i className="fas fa-adjust" />Present</span>
                                <span><i className="far fa-circle" />Future</span>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {this.renderTimeline(events)}
                    </Card.Body>
                </Card>
            );
        }
    }

    renderTimeline(events) {
        return (
            <div className="event-timeline">
                {_.map(events, (event, index) => (
                    this.renderEventRow(event, index)
                ))}
            </div>
        );
    }

    renderEventRow(event, index) {
        return (
            <div className="event-row">
                {this.renderEventDate(event, index)}
                {this.renderEventNode(event)}
                {this.renderEventDescription(event, index)}
            </div>
        );
    }

    renderEventDate(event) {
        const { eventDate, date } = event;
        const chosenDate = !date ? eventDate : date;

        const dateMonth = moment(chosenDate).format('M/D');
        const weekDay = moment(chosenDate).format('ddd');

        return (
            <Alert variant="secondary" className="event-date">
                <div>{dateMonth}</div>
                <div className="week-day">{weekDay.toLowerCase()}</div>
            </Alert>
        );
    }

    renderEventNode(event) {
        const { eventDate, date } = event;
        const chosenDate = !date ? moment(eventDate) : moment(date);
        const now = moment();

        let nodeIcon = now.isBefore(chosenDate) ? 'far fa-circle' : 'fas fa-circle';

        if (now.isSame(chosenDate, 'day')) {
            nodeIcon = 'fas fa-adjust';
        }

        return (
            <div className="event-node">
                <i className={nodeIcon} />
            </div>
        );
    }

    renderEventDescription(event, index) {
        const { name, _id, description, eventDate } = event;

        return (
            <Card key={index} className="event-description">
                <Card.Body className="event-card-body">
                    <div className="top">
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {_.truncate(description, { 'length': 150 })}
                        </Card.Text>
                    </div>
                    <Link to={`/event/${_id}`}>
                        <Button 
                            variant="success"
                            className="event-view-button"
                        >
                            View
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }

    renderAlliance(alliance) {
        if (alliance && alliance.length) {
            return (
                <Card className="alliance-card">
                    <Card.Header>
                        <h5 style={{ margin: 0 }}>Alliance</h5>
                    </Card.Header>
                    <Card.Body className="alliance-card-body">
                        {_.map(alliance, (org, index) => this.renderOrganizationCard(org, index))}
                    </Card.Body>
                </Card>
            );
        }
    }

    renderOrganizationCard(org, index) {
        const { name, id, tagline } = org;

        return (
            <Card key={index} className="organization-card">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body className="organization-card-body">
                    <div className="top">
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {_.truncate(tagline, { 'length': 150 })}
                        </Card.Text>
                    </div>
                    <Link to={`/organization/${id}`}>
                        <Button 
                            variant="outline-success"
                            className="org-view-button"
                        >
                            View
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }

    render() {
        const { project, organization, getProjectStatus } = this.props;

        const {
            name,
            description,
            details,
            eventRecords: events,
            alliance_data: alliance
        } = project;

        if (getProjectStatus !== SUCCESS) return <Loader />;

        return (
            <div className="project-page">
                {this.renderModal()}
                {this.renderHeader(name, organization, description)}
                {this.renderDetails(details)}
                {this.renderEvents(events)}
                {this.renderAlliance(alliance)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: _.get(state, 'projects.selectedProject.data', {}),
    getProjectStatus: _.get(state, 'projects.selectedProject.status.get'),
    updateProjectStatus: _.get(state, 'projects.selectedProject.status.update'),
    organizations: _.get(state, 'organizations.data', {}),
    organization: _.get(state, 'projects.selectedProject.data.organization', {}),
    organizationId: _.get(state, 'organizations.selectedOrg.data.organizationId', {}),
    projectEvents: _.get(state, 'projects.selectedProject.data.eventRecords', []),
    form: _.get(state, 'form.EditProject')
});

const mapDispatchToProps = {
    getProjectById, 
    updateProject, 
    getOrganizations, 
    getEventsById,
    getOrganizationById
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
