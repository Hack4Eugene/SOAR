import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Timeline extends Component {
    render() {
        return (
            <ul>
                {_.map(this.props.events, (event, i) =>
                    <TimelineCard {...event} key={i} position={i % 2 === 0 ? 'right' : 'left'} />
                )}
            </ul>
        );
    }
}

const TimelineCard = props => (
    <li>
        <div className="card">
            <h5 className="card-header timeline-card-header">
                <span className="btn btn-outline-secondary timeline-card-badge">
                    March 8
                </span>
                {props.name}
            </h5>
            <div className={`card-body ${props.position}-timeline-card-body`}>
                {props.description}
                <Link to={`/event/${props._id}`} className="btn btn-success timeline-card-button">Go to
                    event</Link>
            </div>

        </div>
    </li>
);

export default Timeline;
