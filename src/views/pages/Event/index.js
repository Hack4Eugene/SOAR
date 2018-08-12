import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, filter, isEqual, isArray, isEmpty } from 'lodash';
import { getEventById } from '../../../state/actions/index.js';
import Card from '../../lib/Card';
import moment from 'moment';
import eventImage from '../../../static/imgs/sat-market.jpg';
import eventMap from '../../../static/imgs/event-map.png';
import hazenImg from '../../../static/imgs/david-hazen.jpg';
import maryImg from '../../../static/imgs/mary.jpeg';
import janetImg from '../../../static/imgs/janet.jpg';
import './EventPage.css';

import {
    StaticGoogleMap,
    Marker,
    Path,
  } from 'react-static-google-map';

class EventPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const eventId = get(this.props, 'computedMatch.params.id', '')
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
        
    )

    showMainContent = () => {
        const event = get(this.props, 'selectedEvent.data', {})
        const eventTitle = get(event, 'name', '')
        const eventDescription = get(event, 'description', '')

        return (
            <div className="col-8">
                <div className="jumbotron p-4 mb-4">
                    <h1 className="display-4">{eventTitle}</h1>
                    <hr />
                    <p className="lead">{eventDescription}</p>
                </div>
                <img className="event-page-image mb-4" src={eventImage} />
                <Card>
                    <div className="card-body">
                        <h4 style={{ color: '#28a745' }}>
                            <i className="fa fa-leaf mr-3" />
                            Event Details
                        </h4>
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus lorem a nisl bibendum dignissim. Morbi facilisis elit in efficitur dignissim. Quisque dignissim sit amet nulla at sollicitudin. Etiam laoreet, elit eget sagittis interdum, lacus enim commodo neque, vel faucibus leo risus a lorem. Praesent fermentum sed lorem a vestibulum. Morbi porttitor ipsum porta ipsum dictum, et eleifend ex imperdiet. Cras pellentesque lobortis lorem, et placerat risus pretium sed. Phasellus iaculis quis elit congue feugiat.
                        </p>
                    </div>
                </Card>
            </div>
        )
    }

    showSideContent = () => {
        return (
            <div className="col-4">
                {this.showRSVPBox()}
                {this.showEventDetailsBox()}
                {this.showHost()}
                {this.showAttendees()}
            </div>
        )
    }

    showHost = () => {
        return (
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
            
        )
    }

    showAttendees = () => {
        return (
            <Card>
                <div className="card-header" style={{ color: '#666' }}>
                    <p className="mb-0">
                        <i className="fa fa-users mr-3" />
                        Attendees (12)
                    </p>
                </div>
                <div className="card-body d-flex flex-column justify-content-center">
                    <img className="event-user-avatar m-auto mb-3" src={maryImg} />
                    <h5 className="m-auto mb-0">Mary O'Connor</h5>
                    <p className="m-auto mb-0 font-italic" style={{ color: '#939393' }}>Peace Corps</p>
                </div>
                <hr className="m-0" />
                <div className="card-body d-flex flex-column justify-content-center">
                    <img className="event-user-avatar m-auto mb-3" src={janetImg} />
                    <h5 className="m-auto mb-0">Janet Davis</h5>
                    <p className="m-auto mb-0 font-italic" style={{ color: '#939393' }}>White Bird Clinic</p>
                </div>
            </Card>
        )
    }

    showEventDetailsBox = () => {
        const event = get(this.props, 'selectedEvent.data', {})
        const eventDate = get(event, 'eventDate', '')
        const eventLocation = get(event, 'location', '')

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
                                <i className="fa fa-map-marker mr-3 event-page-icon" style={{ marginLeft: '1px' }}/>
                                {eventLocation}
                            </p>
                        </div>
                        {/* <hr /> */}
                        <div className="fill">
                            <img src={eventMap} />
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    showRSVPBox = () => (
        <div className="mb-4">
            <Card>
                <div className="card-body">
                    <div className="d-flex flex-row justify-content-between mb-0">
                        <h6 className="mb-3">Are you going to this event?</h6>
                        {/* <p style={{ fontStyle: 'italic', color: '#939393' }}>12 people going</p> */}
                    </div>
                    <p className="d-flex flex-row justify-content-between mb-0">
                        <button type="button" class="btn btn-outline-primary w-100">Yes</button>
                        <button type="button" class="btn btn-outline-secondary w-100 mr-3 ml-3">Maybe</button>
                        <button type="button" class="btn btn-outline-danger w-100">No</button>
                    </p>
                </div>
            </Card>
        </div>
    )
    
    render() {
        return (
            <div className="container pb-4">
                <div className="row">
                    {this.showMainContent()}
                    {this.showSideContent()}
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return ({
        selectedEvent: get(state, 'selectedEvent', {}),
        eventStatus: get(state, 'selectedEvent.status', 'NOT_STARTED')
    });
};

export default connect(mapStateToProps, { getEventById })(EventPage);