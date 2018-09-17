import React, { Component } from 'react';

class ProjectCard extends Component {
    render() {
        return (
            <div className="card text-center m-4">
            <div className="card-header text-left">
            This Project was created {this.props.startDate}
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
