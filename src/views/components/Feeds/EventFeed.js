import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, isEmpty } from 'lodash';
import moment from 'moment';
import Calendar from 'react-calendar';

import EventsWidget from '../Widgets/Event';
// import eventImg1 from '../../../static/imgs/stock-event-1.jpg';

import Card from '../../lib/Card';

import { getEvents } from '../../../state/actions/index.js';

class EventFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredEvents: null,
            selectedDate: null
        };
    }

    componentDidMount() {
        this.props.getEvents();
    }

    onDateChange(date) {
        const tempFilteredEvents = filter(this.props.events, event => {
            const eventDate = moment(event.eventDate);
            const selectedDate = moment(date);

            return eventDate.isSame(selectedDate, 'day');
        });

        this.setState({ filteredEvents: tempFilteredEvents });

        // console.log('this.state.filteredEvents', this.state.filteredEvents)
        // console.log('tempFilteredEvents', tempFilteredEvents)

        // let isSame = false
        // if (isEqual(this.state.filteredEvents, tempFilteredEvents)) {
        //     // isSame = true
        //     this.setState({
        //         filteredEvents: this.props.events
        //     })
        // } else {
        //     !isEmpty(tempFilteredEvents)
        //     ? this.setState({ filteredEvents: tempFilteredEvents })
        //     : this.setState({ filteredEvents: [] }) 
        // }
    }

    showFeedHeader() {
        const events = this.state.filteredEvents;
        if (events === null) {
            return (
                <div className="col-8">
                    <h2 className="ml-3">Your Upcoming Events</h2>
                </div>
            );
        }

        let selectedDate = 'No events on this date';

        if (!isEmpty(events)) {
            selectedDate = `Events on ${moment(events[0].eventDate).format('dddd MMM M YYYY')}`;
        }

        return (
            <div className="col-8">
                <h2 className="ml-3">{selectedDate}</h2>
            </div>
        );
    }

    showEvents() {
        if (this.props.eventsStatus === 'SUCCESS') {
            return (
                <div className="col-8">
                    <EventsWidget events={this.state.filteredEvents === null ? this.props.events : this.state.filteredEvents} />
                </div> 
            );
        }

        return (
            <div className="col-8">
                <h4>Loading...</h4>
            </div>
        );
    }

    showCalendar() {
        return (
            <div className="pull-right">
                <Card>
                    <Calendar
                        id="calendar" 
                        value={new Date()}
                        onChange={(value) => this.onDateChange(value)}
                    />
                </Card>
            </div>
        );
    }

    render() {
        return (
            <div className="container">                    
               <div className="row justify-content-center">
                    {this.showFeedHeader()}
                    <div className="col-4">
                        <Link to="/addevent" >
                            <button
type="button" 
                                    className="btn btn-success float-right" 
                                    data-toggle="modal" 
                                    data-target="#exampleModal"
                            >
                                    Add New Event
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.showEvents()}                
                    {this.showCalendar()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        events: get(state, 'events.data', []),
        eventsStatus: get(state, 'events.status', 'NOT_STARTED')
        // animationVal: _.get(state, 'events.animationVal', null),
        // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
    });
};

export default connect(mapStateToProps, { getEvents })(EventFeed);
