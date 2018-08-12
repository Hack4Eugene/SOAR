import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { getEvents } from '../../../state/actions/index.js';

import parkImg from '../../../static/imgs/food.jpg';
import foodLaneImg from '../../../static/imgs/food-lane-county.jpg';
import peaceImg from '../../../static/imgs/peace-corps.jpg';
import habitatImg from '../../../static/imgs/habitat-humanity.png';

import './ProjectPage.css';

const mapStateToProps = (state) => ({
    events: get(state, 'events', {})
    // animationVal: _.get(state, 'events.animationVal', null),
    // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredEvents: props.events
        };
    }

    componentWillMount() {
        this.props.getEvents();
    }

    componentDidMount() {
        console.log(this.props.computedMatch.params.id);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron p-4 project-jumbo">
                            <h1 className="display-4">Harvest to Home Project</h1>
                            <p className="lead">This spring, various groups in our network will collaborate in the
                                entire process of growing, harvesting, and distributing food to local underserved youth.
                                Join us for the whole series, or pick a single event from our timeline below!</p>
                            <hr className="my-4" />
                            <img alt="park" src={parkImg} className="project-header-img" />
                            <hr className="my-4" />
                            <p>We accomplish this by soliciting, collecting, rescuing, growing, preparing and packaging
                                food for distribution through a network of more than 150 partner agencies and
                                distribution sites; through public awareness, education and community advocacy; and
                                through programs designed to improve the ability of low-income individuals to maintain
                                an adequate supply of wholesome, nutritious food.</p>
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

export default connect(mapStateToProps, { getEvents })(Project);
