import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get } from 'lodash';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import EditEvent from '../../components/Forms/EditEvent';
import { createEvent } from '../../../state/actions/eventActions';
import { SUCCESS } from '../../../state/statusTypes';

import './AddEvent.scss';

class AddEvent extends Component {
    submitEvent = () => {
        const values = get(this.props.form, 'values', {});
        this.props.createEvent(values);
    }

    renderForm() {
        return (
            <Card>
                <Card.Body>
                    <EditEvent onSubmit={this.submitEvent} />
                </Card.Body>
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
            <div className="add-event-page">
                <div className="add-event-header">
                    <h2>Create Event</h2>
                    <Link to="/explore#events">
                        <Button
                            type="button" 
                            variant="outline-success"
                        >
                            Back to Events
                        </Button>
                    </Link>
                </div>
                {this.renderForm()}          
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
