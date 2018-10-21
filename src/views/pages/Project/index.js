import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _, { get, map } from 'lodash';

import { getProjectById, updateProject } from '../../../state/actions/projectActions';
import { getOrganizations } from '../../../state/actions/organizationActions';
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

const mapStateToProps = (state) => ({
    project: get(state, 'projects.detailed.data', {}),
    projectStatus: get(state, 'projects.detailed.status', NOT_STARTED),
    form: get(state, 'form.EditProject'),
    organizations: _.get(state, 'organizations.data', {}),
    organizationStatus: _.get(state, 'organizations.status', NOT_STARTED)
});

class OrganizationItem extends Component {
    render() {
        return (
            <div className="card m-2" style={{ maxWidth: '250px', display: 'flex', justifyContent: 'space-between' }}>
                <div className="card-header" style={{ minHeight: 80 }}>
                    <h5 className="card-title mb-0">{this.props.title}</h5>
                </div>

                <img alt={this.props.title} className="card-image card-org-image" src={foodLaneImg} />
                <div className="card-body org-card-body">
                    <Link className="btn btn-outline-success org-card-button" to={`/organization/${this.props.id}`}>
                        Go to organization
                    </Link>
                </div>
            </div>
        );
    }
}

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredEvents: props.events,
            showModal: false
        };
    }

    componentDidMount() {
        const projectID = get(this.props, 'computedMatch.params.id', 'projectID');
        this.props.getProjectById(projectID);
        this.props.getOrganizations();
    }

    componentDidUpdate(prevProps, prevState) {
        const isModalShown = this.state.showModal;
        const isNewProjectData = prevProps.project !== this.props.project;
        const isNewDataFinal = this.props.projectStatus === SUCCESS;

        if (isModalShown && isNewProjectData && isNewDataFinal) {
            this.setState({ showModal: false }); //eslint-disable-line react/no-did-update-set-state
        }
    }

    showAlliance = () => {
        const { alliance_data: allianceData } = this.props.project;
        if (!allianceData || allianceData.length < 1) {
            return <h3 className="display-5">This project doesn't have any allies yet.</h3>;
        }

        // console.log(allianceData)

        const OrganizationList = allianceData.length
            ? map(allianceData, (ally, i) => <OrganizationItem key={i} title={ally.name} id={ally._id} />)
            : <div />;

        return OrganizationList;
    };

    submitEdits = () => {
        const updates = get(this.props.form, 'values', {});
        this.props.updateProject(this.props.project._id, updates);
    };

    render() {
        const { organizations, organizationStatus, projectStatus } = this.props;
        const {
            name,
            tagline,
            description,
            organization
        } = this.props.project;

        const host = _.find(organizations, org => org._id === organization);

        const project = _.mapValues(this.props.project, (value, key) => {
            if (key === 'startDate' || key === 'endDate') {
                return moment(value).format('YYYY-MM-DD')
            }
            return value
        })

        if (organizationStatus !== SUCCESS || projectStatus !== SUCCESS) return <div>Loading...</div>;

        return (
            <div className="container pt-4">
                <Modal show={this.state.showModal} hide={() => this.setState({ showModal: !this.state.showModal })}>
                    <EditProject
                        initialValues={project}
                        onSubmit={this.submitEdits}
                    />
                </Modal>
                <div className="row">
                    <div className="col">
                        <div className="jumbotron p-4 project-jumbo">
                            <ToolBar onEdit={() => this.setState({ showModal: !this.state.showModal })}>
                                <h1 className="display-4">{name}</h1>
                            </ToolBar>
                            <p><i>Hosted By: {host && host.name}</i></p>

                            <p className="lead">{tagline}</p>
                            <hr className="my-4" />

                            <img alt="park" src={parkImg} className="project-header-img" />
                            <hr className="my-4" />

                            <p>{description}</p>

                            <h1 className="display-4 alliance-header">- Our Alliance -</h1>
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                {this.showAlliance()}
                            </div>
                            {/* <div className="d-flex flex-row flex-wrap justify-content-center">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">FOOD for Lane County</h5>
                                    </div>

                                    <img alt="Food for Lane County" className="card-image card-org-image" src={foodLaneImg} />
                                    <div className="card-body org-card-body">
                                        <Link className="btn btn-outline-success org-card-button" to="/profile">
                                            Go to organization
                                        </Link>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Habitat for Humanity</h5>
                                    </div>

                                    <img alt="habitat" className="card-image card-org-image" src={habitatImg} />
                                    <div className="card-body org-card-body">
                                        <Link className="btn btn-outline-success org-card-button" to="/profile">Go to
                                            organization</Link>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Peace Corps</h5>
                                    </div>

                                    <img alt="Peace" className="card-image card-org-image" src={peaceImg} />
                                    <div className="card-body org-card-body">
                                        <Link className="btn btn-outline-success org-card-button" to="/profile">Go to
                                            organization</Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <section className="timeline">
                    <Timeline events={this.props.project.eventRecords} />
                </section>
                <div className="card" style={{ marginTop: '50px' }}>
                    <div className="card-header"><h2>Our Accomplishments</h2></div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">✓ 300 Canned food items</li>
                            <li className="list-group-item">✓ 50 Rain jackets</li>
                            <li className="list-group-item">✓ 80 Volunteer hours</li>
                            <li className="list-group-item">✓ 300 Meals distributed</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { getProjectById, updateProject, getOrganizations })(Project);
