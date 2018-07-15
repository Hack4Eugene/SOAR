import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
    deleteEvent,
    deleteProject
} from '../state/actions/index';

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
            <div>
                <div className="d-inline-flex justify-content-between w-100">
                    {this.props.children}
                    <div className="d-inline-flex justify-self-end icon-container">
                        <i className="fas fa-pencil-alt mr-2" /><i className=" ml-2 fas fa-times" onClick={this.onDeleteClick} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { deleteEvent, deleteProject })(ToolBar);