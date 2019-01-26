import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get } from 'lodash';

import Card from '../../lib/Card';

import { createEvent } from '../../../state/actions/eventActions';
import EditEvent from '../../components/Forms/EditEvent';
import { SUCCESS } from '../../../state/statusTypes';

class AddEvent extends Component {
    submitEvent = () => {
        const values = get(this.props.form, 'values', {});
        this.props.createEvent(values);
    }

    renderForm() {
        return (
            <Card>
                <div className="card-body">
                    <EditEvent onSubmit={this.submitEvent} />
                </div>
            </Card>
        );
    }

    redirectToCreatedEvent = () => {
        const { selectedEvent } = this.props;
        const eventId = _.get(selectedEvent, 'data.data._id', '');

        return <Redirect to={`/event/${eventId}`} />
    };

    render() {
        const shouldRedirect = this.props.createEventStatus === SUCCESS

        if (shouldRedirect) {
            return this.redirectToCreatedEvent();
        }

        return (
            <div className="container">                    
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2 className="ml-3">Add Event</h2>
                    </div>
                    <div className="col-3">
                        <Link to="/events">
                            <button
                                type="button" 
                                className="btn btn-success float-right" 
                                data-toggle="modal" 
                                data-target="#exampleModal"
                            >
                                Back to Events
                        </button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        {this.renderForm()}          
                    </div>                  
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    selectedEvent: _.get(state, 'events.selectedEvent'),
    createEventStatus: _.get(state, 'events.selectedEvent.status.create'),
    form: get(state, 'form.EditEvent')
  });

export default connect(mapStateToProps, { createEvent })(AddEvent);
