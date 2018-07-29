import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, filter, isEqual, isArray, isEmpty } from 'lodash';
import { getEventById } from '../../../state/actions/index.js';

class EventPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const eventId = get(this.props, 'computedMatch.params.id', '')
        this.props.getEventById(eventId);
        console.log('EventPage props', this.props);
    }

    showTitleCard() {
        const event = get(this.props, 'selectedEvent.data', {})

        const eventTitle = get(event, 'name', '')
        const eventDate = get(event, 'eventDate', '')
        const eventLocation = get(event, 'location', '')
        const eventDescription = get(event, 'description', '')

        return (
            <div className="jumbotron p-4">
                <h1 className="display-4">{eventTitle}</h1>
                <p className="lead">
                    We are a private, 501(c)(3) nonprofit food bank dedicated to alleviating hunger by
                    creating access to food.
                </p>
                <hr className="my-4"/>
                <p>
                    We accomplish this by soliciting, collecting, rescuing, growing, preparing and packaging food for
                    distribution through a network of more than 150 partner agencies and distribution sites; through
                    public awareness, education and community advocacy; and through programs designed to improve the
                    ability of low-income individuals to maintain an adequate supply of wholesome, nutritious
                    food.
                </p>
            </div>
        );
    }
    
    render() {
        return (
            <div className="container">
                {this.showTitleCard()}
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    console.log('Event state', state);
    return ({
        selectedEvent: get(state, 'selectedEvent', {}),
        eventStatus: get(state, 'selectedEvent.status', 'NOT_STARTED')
    });
};

export default connect(mapStateToProps, { getEventById })(EventPage);