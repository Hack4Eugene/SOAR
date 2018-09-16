import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, reduce, isEqual } from 'lodash';

import { getProjectById, updateProject } from '../../../state/actions/projectActions';
import { NOT_STARTED, SUCCESS } from '../../../state/statusTypes';

import ToolBar from '../../lib/ToolBar';
import Modal from '../../lib/Modal';
import EditProject from '../../components/Forms/EditProject';

import { diffBetween } from '../../../lib/util';

import parkImg from '../../../static/imgs/food.jpg';
import foodLaneImg from '../../../static/imgs/food-lane-county.jpg';
import peaceImg from '../../../static/imgs/peace-corps.jpg';
import habitatImg from '../../../static/imgs/habitat-humanity.png';

import './ProjectPage.scss';

const mapStateToProps = (state) => ({
    project: get(state, 'projects.detailed.data', {}),
    projectStatus: get(state, 'projects.detailed.status', NOT_STARTED),
    form: get(state, 'form.EditProject')
    // animationVal: _.get(state, 'events.animationVal', null),
    // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

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
    }

    componentDidUpdate(prevProps, prevState) {
        const isModalShown = this.state.showModal;
        const isNewProjectData = prevProps.project !== this.props.project;
        const isNewDataFinal = this.props.projectStatus === SUCCESS;

        if (isModalShown && isNewProjectData && isNewDataFinal) {
            this.setState({ showModal: false }); //eslint-disable-line react/no-did-update-set-state
        }
    }

    submitEdits = () => {
        const currentRecord = this.props.project;
        const updates = get(this.props.form, 'values', {});
        // const filteredUpdates = diffBetween(currentRecord, updates);

        this.props.updateProject(this.props.project._id, updates);
    };

    render() {
        const {
            name,
            tagline,
            description
        } = this.props.project;

        return (
            <div className="container pt-4">
                <Modal show={this.state.showModal} hide={() => this.setState({ showModal: !this.state.showModal })}>
                    <EditProject
                        initialValues={this.props.project}
                        onSubmit={this.submitEdits}
                    />
                </Modal>
                <div className="row">
                    <div className="col">
                        <div className="jumbotron p-4 project-jumbo">
                            <ToolBar onEdit={() => this.setState({ showModal: !this.state.showModal })}>
                                <h1 className="display-4">{name}</h1>
                            </ToolBar>
                            <p className="lead">{tagline}</p>
                            <hr className="my-4" />
                            <img alt="park" src={parkImg} className="project-header-img" />
                            <hr className="my-4" />
                            <p>{description}</p>
                            <h1 className="display-4 alliance-header">- Our Alliance -</h1>

                            <div className="row">
                                <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">FOOD for Lane County</h5>
                                    </div>

                                    <img alt="Food for Lane County" className="card-image card-org-image" src={foodLaneImg} />
                                    <div className="card-body org-card-body">
                                        <Link className="btn btn-outline-success org-card-button" to="/profile">Go to
                                            organization</Link>
                                    </div>
                                </div>
                                <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Habitat for Humanity</h5>
                                    </div>

                                    <img alt="habitat" className="card-image card-org-image" src={habitatImg} />
                                    <div className="card-body org-card-body">
                                        <Link className="btn btn-outline-success org-card-button" to="/profile">Go to
                                            organization</Link>
                                    </div>
                                </div>
                                <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Peace Corps</h5>
                                    </div>

                                    <img alt="Peace" className="card-image card-org-image" src={peaceImg} />
                                    <div className="card-body org-card-body">
                                        <Link className="btn btn-outline-success org-card-button" to="/profile">Go to
                                            organization</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="timeline">
                    <ul>
                        <li>
                            <div className="card">
                                <h5 className="card-header timeline-card-header"><span
                                    className="btn btn-outline-secondary timeline-card-badge"
                                >March 8</span>Harvest Day
                                    at the Farm</h5>
                                <div className="card-body right-timeline-card-body">
                                    Bob Smith has invited us to come harvest the rest of his potato crop. We are going
                                    to harvest as many potatoes as we can to disperse among our food network.
                                    <button type="button" className="btn btn-success timeline-card-button">Go to
                                        event</button>
                                </div>

                            </div>
                        </li>
                        <li>
                            <div className="card">
                                <h5 className="card-header timeline-card-header"><span
                                    className="btn btn-outline-secondary timeline-card-badge"
                                >March 12</span>Canned Food
                                    Drive</h5>
                                <div className="card-body left-timeline-card-body">
                                    Throughout the month of May, bring canned food to CBT Nuggets as part of our Fall
                                    Food Initiative!
                                    <button type="button" className="btn btn-success timeline-card-button">Go to
                                        event</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card">
                                <h5 className="card-header timeline-card-header"><span
                                    className="btn btn-outline-secondary timeline-card-badge"
                                >April 4</span>Harvest Day
                                    at the Farm</h5>
                                <div className="card-body right-timeline-card-body">
                                    Bob Smith has invited us to come harvest the rest of his potato crop. We are going
                                    to harvest as many potatoes as we can to disperse among our food network.
                                    <button type="button" className="btn btn-success timeline-card-button">Go to
                                        event</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card">
                                <h5 className="card-header timeline-card-header"><span
                                    className="btn btn-outline-secondary timeline-card-badge"
                                >April 23</span>Meals on
                                    Wheels</h5>
                                <div className="card-body left-timeline-card-body">
                                    Help us deliver all of the wonderful food we have gathered to our community! We need
                                    drivers, navigators, and volunteers to help carry and deliver the food to those in
                                    need.
                                    <button type="button" className="btn btn-success timeline-card-button">Go to
                                        event</button>
                                </div>
                            </div>
                        </li>
                    </ul>
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

export default connect(mapStateToProps, { getProjectById, updateProject })(Project);
