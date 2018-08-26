import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import moment from 'moment';

// import eventImg1 from '../../../../static/imgs/stock-event-1.jpg';

import ToolBar from '../../../lib/ToolBar';
import Card from '../../../lib/Card';
import './Event.scss';

const EventItem = ({ event, filtered }) => {
    const date = filtered 
        ? moment(event.eventDate).utc().format('h:mm a')
        : moment(event.eventDate).utc().format('dddd MMM D, YYYY - h:mm a');

    return (
        <Card>
            <div className="card-header">
                <div className="event-card-header">
                    {date}
                    <ToolBar data={event} type="event" />
                </div>
                
            </div>
            {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
            <div className="card-body">
                <span className="badge badge-secondary">{event.project.name || 'Unknown'}</span>
                <h4 className="card-title mb-1 mt-1">{event.name}</h4>
                <p className="font-italic font-weight-light">{event.location}</p>
                <p className="card-text">{event.description}</p>
                    <Link 
                        className="btn btn-primary" 
                        to={`/event/${event._id}`}
                    >
                        More details
                    </Link>
            </div>
        </Card>
    );
};

const NoEvents = () => {
    return (
        <p className="font-italic m-3">No events yet!</p>
    );
};

const EventsWidget = ({ events, filtered }) => {
    const EventList = events.length
        ? map(events, event =>
            (<div className="mb-4" key={event._id}>
                <EventItem filtered={filtered} event={event} />
            </div>))
        : <NoEvents />;

    return EventList;
};

export default EventsWidget;
