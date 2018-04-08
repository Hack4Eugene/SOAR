import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { map, orderBy } from 'lodash';
import moment from 'moment';

import eventImg1 from '../static/imgs/stock-event-1.jpg';

import Card from './Card';

const EventItem = ({ event, key }) => {
  const date = moment(moment.unix(event.date)).format('MMMM D, YYYY - h:mm a');
    return (
      <div className="mb-4">
        <Card key={key}>
            <div className="card-header">{date}</div>
            {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
            <div className="card-body">
                <span class="badge badge-secondary">{event.project}</span>
                <h4 className="card-title mb-0">{event.name}</h4>
                <p className="font-italic font-weight-light">{event.location}</p>
                <p className="card-text">
                    {event.description}
                </p>
            </div>
        </Card>
        </div>
    )
}

const NoEvents = () => {
    return (
        <p className="font-italic m-3">No events yet!</p>
    )
}

const EventsWidget = ({ events }) => {
//   console.log(events)
  const orderedEvents = orderBy(events, 'date', 'asc')
    
  const EventList = orderedEvents.length
      ? map(orderedEvents, event => 
          <EventItem event={event} key={event.id} />) 
      : <NoEvents />;

  return (
    <div>
      {EventList}
    </div>
  );
}

export default EventsWidget;
