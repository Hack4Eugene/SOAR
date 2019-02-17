import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
// import {
//     StaticGoogleMap,
//     Marker,
// } from 'react-static-google-map';

import { NOT_STARTED, SUCCESS, ERROR } from '../../../state/statusTypes';
import { getEventById, updateEvent } from '../../../state/actions/eventActions.js';
import EditEvent from '../../components/Forms/EditEvent';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Loader from '../../global/Loader';
import eventImage from '../../../static/imgs/sat-market.jpg';
import eventMap from '../../../static/imgs/event-map.png';
import defaultProfilePic from '../../../static/imgs/default-profile-pic.jpeg';
// import ToolBar from '../../lib/ToolBar';
import Modal from '../../lib/Modal';

import './EventPage.scss';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditEventModal: false
        };
    }

    componentDidMount() {
        const eventId = _.get(this.props, 'computedMatch.params.id', '');
        this.props.getEventById(eventId);
    }

    componentDidUpdate(prevProps, prevState) {
        const isModalShown = this.state.showEditEventModal;
        const isNewEventData = prevProps.event !== this.props.event;
        const isNewDataFinal = this.props.updateEventStatus === SUCCESS;

        if (isModalShown && isNewEventData && isNewDataFinal) {
            this.setState({ showEditEventModal: false }); //eslint-disable-line react/no-did-update-set-state
        }
    }

    submitEdits = () => {
        const updates = _.get(this.props.form, 'values', {});
        this.props.updateEvent(this.props.event._id, updates)
    };

    // showEventMap = () => (
    //     <div className="fill">
    //         <StaticGoogleMap size="600x600">
    //             <Marker.Group label="T" color="brown">
    //                 <Marker location="40.737102,-73.990318" />
    //                 <Marker location="40.749825,-73.987963" />
    //             </Marker.Group>
    //         </StaticGoogleMap>
    //     </div>
        
    // );

    updateEventAttendance = () => {
        const obj = {
            attendeeId: this.props.userId,
        };
        this.props.updateEvent(this.props.event._id, obj);
    };

    toggleModal = () => {
        this.setState({ 
            showEditEventModal: !this.state.showEditEventModal 
        })
    }

    renderModal() {
        const event = _.mapValues(this.props.event, (value, key) => {
            if (key === 'date') {
                return moment(value).format('YYYY-MM-DDTHH:mm')
            }
            return value
        })

        return (
            <Modal show={this.state.showEditEventModal} hide={() => this.setState({ showEditEventModal: false })}>
                <EditEvent
                    initialValues={event}
                    onSubmit={this.submitEdits}
                />
            </Modal>
        )
    }

    renderHeader(name, description, project) {
        return (
            <Fragment>
                <Button 
                    variant="light"
                    className="edit-event-button"
                    onClick={this.toggleModal}
                >
                    Edit event
                </Button>
                <Jumbotron className="event-jumbotron">
                    <h1>{name}</h1>
                    <i>Part of the <Link to={`/project/${project._id}`} style={{ textDecoration: 'underline' }}>{project.name}</Link> project</i>
                    <hr />
                    <p style={{ margin: 0 }}>{description}</p>
                </Jumbotron>
                <img className="event-image" src={eventImage} alt="event image" />
            </Fragment>
        );
    }

    renderDetails(details) {
        if (details) {
            return (
                <Card className="event-details-card">
                    <Card.Header>
                        <h5 style={{ margin: 0 }}>Details</h5>
                    </Card.Header>
                    <Card.Body>{details}</Card.Body>
                </Card>
            );
        }
    }

    renderGoals(goals) {
        if (goals.length) {
            return (
                <Card className="event-goals-card">
                    <Card.Header>
                        <h5 style={{ margin: 0 }}>Goals</h5>
                    </Card.Header>
                    <Card.Body>
                        <ul>
                            {_.map(goals, goal => (
                                <li>{goal}</li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            );
        }
    }

    renderAttendanceControl(isAttending) {
        return (
            <Card className="attendance-control-card">
                <Card.Body>
                    <h5>{isAttending ? 'You\'re going to this event!' : 'Are you going?'}</h5>
                    <Button 
                        variant="outline-success"
                        className="attendance-control-button"
                        onClick={this.updateEventAttendance}
                    >
                        { isAttending ? 'Cancel' : 'Yes' }
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    renderEventDateLocation(date, location) {
        return (
            <Card className="date-location-card">
                <Card.Body>
                    <div>
                        <i className="fa fa-calendar" />
                        {moment(date).format('dddd, MMMM D, YYYY')}
                    </div>
                    <hr />
                    <div>
                        <i className="fa fa-clock" />
                        {moment(date).format('h:mm a')}
                    </div>
                    <hr />
                    <div>
                        <i className="fa fa-map-marker" />
                        {location}
                    </div>
                </Card.Body>
                <Card.Img variant="bottom" src={eventMap} />
            </Card>
        );
    }

    renderAttendees(attendees) {
        const length = _.get(attendees, 'length', 0);

        return (
            <Card className="attendees-card">
                <Card.Header>
                    <h5 style={{ margin: 0 }}>{`Attendees (${length})`}</h5>
                </Card.Header>
                <Card.Body>
                    {_.map(attendees, (attendee, i) => (
                        <Fragment key={`attendee-${i}`}>
                            <div className="attendee">
                                <img src={defaultProfilePic} />
                                <div>{attendee.name}</div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </Card.Body>
            </Card>
        );
    }
    
    render() {
        const { event, userId, getEventStatus } = this.props;
        const { name, date, location, description, details, attendeeIds, attendees, project, goals } = event;
        const isAttending = _.includes(attendeeIds, userId);

        if (getEventStatus !== SUCCESS) return <Loader />

        return (
            <Fragment>
                {this.renderModal()}
                <div className="event-page">
                    <div className="main">
                        {this.renderHeader(name, description, project)}
                        {this.renderDetails(details)}
                        {this.renderGoals(goals)}
                    </div>
                    <div className="side">
                        {this.renderAttendanceControl(isAttending)}
                        {this.renderEventDateLocation(date, location)}
                        {this.renderAttendees(attendees)}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        events: _.get(state, 'events.data', {}),
        event: _.get(state, 'events.selectedEvent.data', {}),
        getEventStatus: _.get(state, 'events.selectedEvent.status.get'),
        createEventStatus: _.get(state, 'events.selectedEvent.status.create'),
        updateEventStatus: _.get(state, 'events.selectedEvent.status.update'),
        userId: _.get(state, 'user.data._id', ''),
        attendeeIds: _.get(state, 'events.selectedEvent.data.attendeeIds', []),
        attendees: _.get(state, 'events.selectedEvent.data.attendees', []),
        form: _.get(state, 'form.EditEvent'),
    });
};

export default connect(mapStateToProps, { getEventById, updateEvent })(EventPage);
