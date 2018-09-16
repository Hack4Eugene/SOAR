import React, { Component } from 'react';

import Card from '../../../lib/Card';

const ProjectItem = ({ project }) => {
    return (
        <Card>
            <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                <div className="card-header">
                    <h5 className="card-title mb-0">{project.name}</h5>
                </div>
                <div className="card-body">

                    <p className="card-text">{project.description}</p>
                    <a href="#" className="btn btn-outline-success float-right">More Info</a>
                </div>
            </div>
        </Card>
    );
};

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
