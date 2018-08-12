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
    }

    showTitleCard() {
        const event = get(this.props, 'selectedEvent.data', {})

        const eventTitle = get(event, 'name', '')
        const eventDate = get(event, 'eventDate', '')
        const eventLocation = get(event, 'location', '')
        const eventDescription = get(event, 'description', '')

        return (
            <div className="row">
                <div className="col-8">
                    <div className="jumbotron p-4">
                        <h1 className="display-4">{eventTitle}</h1>
                        <p className="lead">
                            We are a private, 501(c)(3) nonprofit food bank dedicated to alleviating hunger by
                            creating access to food.
                        </p>
                        <hr className="my-4"/>
                        <p>{eventDescription}</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="jumbotron p-4">
                        <p>Are you going?</p>
                    </div>
                </div>
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
    return ({
        selectedEvent: get(state, 'selectedEvent', {}),
        eventStatus: get(state, 'selectedEvent.status', 'NOT_STARTED')
    });
};

export default connect(mapStateToProps, { getEventById })(EventPage);