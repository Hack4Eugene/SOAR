import React, { Component } from 'react';
import { connect } from 'react-redux';
import _, { get, includes } from 'lodash';
import moment from 'moment';
import {
    StaticGoogleMap,
    Marker,
} from 'react-static-google-map';

import { getEventById, updateEvent } from '../../../state/actions/eventActions.js';
import EditEvent from '../../components/Forms/EditEvent';
import Card from '../../lib/Card';

import eventImage from '../../../static/imgs/sat-market.jpg';
import eventMap from '../../../static/imgs/event-map.png';
import hazenImg from '../../../static/imgs/david-hazen.jpg';
import maryImg from '../../../static/imgs/mary.jpeg';
import janetImg from '../../../static/imgs/janet.jpg';
import './EventPage.scss';
import ToolBar from '../../lib/ToolBar';
import Modal from '../../lib/Modal';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditEventModal: false
        };
    }

    componentDidMount() {
        const eventId = get(this.props, 'computedMatch.params.id', '');
        this.props.getEventById(eventId);
    }

    showEventMap = () => (
        <div className="fill">
            <StaticGoogleMap size="600x600">
                <Marker.Group label="T" color="brown">
                    <Marker location="40.737102,-73.990318" />
                    <Marker location="40.749825,-73.987963" />
                </Marker.Group>
            </StaticGoogleMap>
        </div>
        
    );

    showMainContent = () => {
        const event = get(this.props, 'selectedEvent', {});
        const eventTitle = get(event, 'name', '');
        const eventDescription = get(event, 'description', '');

        return (
            <div className="col-8">
                <div className="jumbotron p-4 mb-4">
                    <ToolBar 
                        data={event} 
                        type={'event'} 
                        onEdit={() => this.setState({ showEditEventModal: true })}
                    >
                            <h1 className="display-4">{eventTitle}</h1>
                    </ToolBar>
                    <hr />
                    <p className="lead">{eventDescription}</p>
                </div>
                <img className="event-page-image mb-4" src={eventImage} />
                {this.showEventDetails()}
                {this.showEventGoals()}
                <button type="button" class="btn btn-outline-secondary">
                    <i className="fas fa-check mr-2" />
                    Close event
                </button>
            </div>
        );
    };

    showEventGoals = () => {
        const event = get(this.props, 'selectedEvent', {});
        if (!_.isEmpty(event.goals)) {
            return (
                <Card>
                    <div className="card-body">
                        <h4 style={{ color: '#28a745' }}>
                            <i className="fas fa-flag-checkered mr-3" />
                            Event Goals
                        </h4>
                        <hr />
                        <ul>
                            {_.map(event.goals, goal => <li>{goal.text}</li>)}
                        </ul>
                    </div>
                </Card>
            )
        }
    }

    showEventDetails = () => (
        <Card>
            <div className="card-body">
                <h4 style={{ color: '#28a745' }}>
                    <i className="fa fa-leaf mr-3" />
                    Event Details
                </h4>
                <hr />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus lorem a nisl bibendum dignissim. 
                    Morbi facilisis elit in efficitur dignissim. Quisque dignissim sit amet nulla at sollicitudin. 
                    Etiam laoreet, elit eget sagittis interdum, lacus enim commodo neque, vel faucibus leo risus a lorem. 
                    Praesent fermentum sed lorem a vestibulum. Morbi porttitor ipsum porta ipsum dictum, et eleifend ex imperdiet. 
                    Cras pellentesque lobortis lorem, et placerat risus pretium sed. Phasellus iaculis quis elit congue feugiat.
                </p>
            </div>
        </Card>
    )

    showSideContent = () => (
        <div className="col-4">
            {this.showRSVPBox()}
            {this.showEventDetailsBox()}
            {/* {this.showHost()} */}
            {this.showAttendees()}
        </div>
    );

    showHost = () => (
        <div className="mb-4">
            <Card>
                <div className="card-header" style={{ color: '#666' }}>
                    <p className="mb-0">
                        <i className="fa fa-user mr-3" />
                        Event Host
                    </p>
                </div>
                <div className="card-body d-flex flex-column justify-content-center">
                    <img className="event-user-avatar m-auto mb-3" src={hazenImg} />
                    <h5 className="m-auto mb-0">David Hazen</h5>
                    <p className="m-auto mb-0 font-italic" style={{ color: '#939393' }}>ECAN</p>
                </div>
            </Card>
        </div>
    );

    showAttendees = () => {
        const numAttendees = this.props.attendees.length
        return (
            <Card>
                <div className="card-header" style={{ color: '#666' }}>
                    <p className="mb-0">
                        <i className="fa fa-users mr-3" />
                        {   
                            numAttendees > 0
                            ? `Attendees (${numAttendees})`
                            : `No one is attending yet!`
                        }
                    </p>
                </div>
                {
                    _.map(this.props.attendeesDetails, attendee => {
                        return (
                            <div className="card-body d-flex flex-column justify-content-center">
                                {/* <img className="event-user-avatar m-auto mb-3" src={maryImg} /> */}
                                <h5 className="m-auto mb-0">{attendee.name}</h5>
                                {/* <p className="m-auto mb-0 font-italic" style={{ color: '#939393' }}>Peace Corps</p> */}
                            </div>
                        )
                    })
                }
            </Card>
        )
    };

    showEventDetailsBox = () => {
        const event = get(this.props, 'selectedEvent', {});
        const eventDate = get(event, 'eventDate', '');
        const eventLocation = get(event, 'location', '');

        return (
            <div className="mb-4">
                <Card>
                    <div className="card-body">
                        <div className="flex-row">
                            <p>
                                <i className="fa fa-calendar mr-3 event-page-icon" />
                                {moment(eventDate).utc().format('dddd, MMMM D, YYYY')}
                            </p>
                        </div>
                        <hr />
                        <div className="flex-row">
                            <p>
                                <i className="fa fa-clock mr-3 event-page-icon" />
                                {moment(eventDate).utc().format('h:mm a')}
                            </p>
                        </div>
                        <hr />
                        <div className="flex-row">
                            <p>
                                <i className="fa fa-map-marker mr-3 event-page-icon" style={{ marginLeft: '1px' }} />
                                {eventLocation}
                            </p>
                        </div>
                        <div className="fill">
                            <img src={eventMap} />
                        </div>
                    </div>
                </Card>
            </div>
        );
    };

    showRSVPBox = () => {
        const attendees = get(this.props, 'selectedEvent.attendees', []);
        const isAttending = includes(attendees, this.props.userId);

        return (
            <div className="mb-4">
                <Card>
                    <div className="card-body">
                        <div className="d-flex flex-row justify-content-between mb-0">
                            <h6 className="mb-3">
                                {
                                    isAttending
                                    ? 'You\'re going to this event!'
                                    : 'Are you going to this event?'
                                }
                            </h6>
                        </div>
                        <p className="d-flex flex-row justify-content-between mb-0">
                            <button 
                                type="button" 
                                className={`btn btn-outline-${isAttending ? 'danger' : 'primary'} w-100`}
                                onClick={this.updateEventAttendance}
                            >
                                {
                                    isAttending 
                                    ? 'I\'m no longer attending' 
                                    : 'I\'ll be there!'
                                }
                            </button>
                        </p>
                    </div>
                </Card>
            </div>
        );
    };

    updateEventAttendance = () => {
        const obj = {
            attendee: this.props.userId,
        };
        this.props.updateEvent(this.props.selectedEvent._id, obj);
    };
    
    render() {
        return (
            <div className="container pb-4">
                <div className="row">
                    <Modal show={this.state.showEditEventModal} hide={() => this.setState({ showEditEventModal: false })}>
                        <EditEvent
                              onSubmit={updates => this.props.updateEvent(this.props.selectedEvent._id, updates)}
                              initialValues={this.props.selectedEvent}
                        />
                    </Modal>
                    {this.showMainContent()}
                    {this.showSideContent()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        events: get(state, 'events.data', {}),
        selectedEvent: get(state, 'events.selectedEvent.data', {}),
        selectedEventStatus: get(state, 'events.selectedEvent.status'),
        userId: get(state, 'user.data._id', ''),
        attendees: get(state, 'events.selectedEvent.data.attendees', []),
        attendeesDetails: get(state, 'events.selectedEvent.data.attendeesDetails', [])
    });
};

export default connect(mapStateToProps, { getEventById, updateEvent })(EventPage);
