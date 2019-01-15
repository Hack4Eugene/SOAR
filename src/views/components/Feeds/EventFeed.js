import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, isEmpty } from 'lodash';
import moment from 'moment';
import Calendar from 'react-calendar';

import EventsWidget from '../Widgets/Event';
// import eventImg1 from '../../../static/imgs/stock-event-1.jpg';

import Card from '../../lib/Card';

import { getEvents } from '../../../state/actions/eventActions';

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
        const selectedDate = moment(date);

        const tempFilteredEvents = filter(this.props.events, event => {
            const eventDate = moment(event.date);
            return eventDate.isSame(selectedDate, 'day');
        });

        this.setState({ 
            filteredEvents: tempFilteredEvents,
            selectedDate
        });
    }

    showFeedHeader() {
        const events = this.state.filteredEvents;

        if (events === null) {
            return (
                <div className="col-8">
                    <h2>Your Upcoming Events</h2>
                </div>
            );
        }

        const formattedDate = moment(this.state.selectedDate).format('dddd MMM D, YYYY');

        let dateMsg = `No events on ${formattedDate}`;

        if (!isEmpty(events)) {
            dateMsg = `Events on ${formattedDate}`;
        }

        return (
            <div className="col-8">
                <h2>{dateMsg}</h2>
            </div>
        );
    }

    showEvents() {
        if (this.props.eventsStatus === 'SUCCESS') {
            return (
                <div className="col-8">
                    <EventsWidget
                        filtered={this.state.filteredEvents !== null}
                        events={ 
                            this.state.filteredEvents === null 
                            ? this.props.events 
                            : this.state.filteredEvents 
                        } 
                    />
                </div> 
            );
        }

        return (
            <div className="col-8">
                <h4>Loading...</h4>
            </div>
        );
    }

    resetFilter = () => {
        this.setState({
            filteredEvents: null
        });
    };

    showCalendar() {
        return (
            <div className="col-4">
                <Card>
                    <Calendar
                        id="calendar" 
                        value={new Date()}
                        onChange={(value) => this.onDateChange(value)}
                    />
                </Card>
                {this.state.filteredEvents !== null 
                    && <button 
                            className="btn btn-light w-100 mt-3" 
                            style={{ border: '1px solid rgba(0, 0, 0, 0.125)' }}
                            onClick={this.resetFilter}
                    >
                                Show all events
                        </button>
                }
            </div>
        );
    }

    showAddEventButton() {
        return (
            <div className="col-4">
                <Link to="/addevent" >
                    <button 
                        type="button" 
                        className="btn btn-success float-right" 
                        data-toggle="modal" 
                        data-target="#exampleModal"
                    >
                        Add new event
                    </button>
                </Link>
            </div>
        );
    }

    render() {
        return (
            <div className="container">                    
               <div className="row mb-2">
                    {this.showFeedHeader()}
                    {this.showAddEventButton()}
                </div>
                <div className="row">
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
