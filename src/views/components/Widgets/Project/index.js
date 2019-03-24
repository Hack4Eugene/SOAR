import moment from 'moment';
import React, { Component } from 'react';

class ProjectCard extends Component {
    getDate = () => moment(this.props.startDate).utc().format('MMM D, YYYY');
    render() {
        return (
            <div className="card text-center mb-4 w-100">
            <div className="card-header text-left">
                Start date: {this.getDate()}
            </div>
                <div className="card-body">
                    <h5 className="card-title text-left">{this.props.title}</h5>
                    {this.props.children}
                    {this.props.link}
                </div>
            </div>
        );
    }
}

export default ProjectCard;
