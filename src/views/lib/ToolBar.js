import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
    deleteEvent,
    deleteProject
} from '../../state/actions/index';

import './toolbar.scss';

//Todo role based presence
class ToolBar extends Component {
    onDeleteClick = () => {
        const {
            type,
            data,
            deleteEvent,
            deleteProject
        } = this.props;

        switch (type) {
            case 'event': {
                deleteEvent(data._id);
                return;
            }
            case 'project': {
                deleteProject(data._id);
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
        )
    }
}

export default connect(null, { deleteEvent, deleteProject })(ToolBar);