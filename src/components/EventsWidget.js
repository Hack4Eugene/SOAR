import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { map, orderBy, find } from 'lodash';
import moment from 'moment';

import eventImg1 from '../static/imgs/stock-event-1.jpg';

import ToolBar from './ToolBar';
import Card from './Card';

const EventItem = ({ event }) => {
    console.log('make event item');
    const date = moment(event.eventDate).format('MMMM D, YYYY - h:mm a');
    return (
        <Card>
            <div className="card-header">{date}</div>
            {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
            <div className="card-body">
                <span className="badge badge-secondary">{event.project.name || 'Unknown'}</span>
                <ToolBar data={event} type="event">
                    <h4 className="card-title mb-0">{event.name}</h4>
                </ToolBar>
                <p className="font-italic font-weight-light">{event.location}</p>
                <p className="card-text">
                    {event.description}
                </p>
            </div>
        </Card>
    )
};

const NoEvents = () => {
    return (
        <p className="font-italic m-3">No events yet!</p>
    )
};

const EventsWidget = ({ events }) => {
    console.log({ events });
    const EventList = events.length
        ? map(events, event =>
            <div className="mb-4" key={event._id}>
                <EventItem event={event}/>
            </div>)
        : <NoEvents/>;

    return (
        <div>
            {EventList}
        </div>
    );
};

export default EventsWidget;
