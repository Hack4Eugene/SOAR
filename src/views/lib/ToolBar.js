import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteEvent } from '../../state/actions/eventActions';
import { deleteProject } from '../../state/actions/projectActions';

import './toolbar.scss';

//Todo role based presence
class ToolBar extends Component {
    onDeleteClick = () => {
        const {
            type,
            data,
            deleteEvent: deleteEventFn,
            deleteProject: deleteProjectFn
        } = this.props;

        switch (type) {
            case 'event': {
                deleteEventFn(data._id);
                return;
            }
            case 'project': {
                deleteProjectFn(data._id);
                return;
            }
            default: return;
        }
    };

    render() {
        return (
            <div className="d-inline-flex icon-container">
                <i className="fas fa-pencil-alt mr-2 dark-gray" /><i className="ml-2 fas fa-times dark-gray" onClick={this.onDeleteClick} />
            </div>
        );
    }
}

export default connect(null, { deleteEvent, deleteProject })(ToolBar);
