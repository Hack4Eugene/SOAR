import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
            deleteProject: deleteProjectFn,
            customDelete
        } = this.props;

        if (customDelete) return customDelete(data);

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
            <div className="toolbar-container d-inline-flex flex-wrap icon-container align-items-center w-100 justify-content-between">
                {this.props.children}
                <div>
                    <i className="fas fa-pencil-alt mr-2 dark-gray" onClick={this.props.onEdit} />
                    <i className="ml-2 fas fa-times dark-gray" onClick={this.onDeleteClick} />
                </div>
            </div>
        );
    }
}

ToolBar.propTypes = {
    type: PropTypes.string,
    data: PropTypes.object,
    deleteEvent: PropTypes.func,
    deleteProject: PropTypes.func,
    onEdit: PropTypes.func,
    customDelete: PropTypes.func
};

export default connect(null, { deleteEvent, deleteProject })(ToolBar);
