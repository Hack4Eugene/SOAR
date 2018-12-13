import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { incrementEventsFinished, setEventsFinished } from '../../../state/actions/eventActions';
import { getProjects } from '../../../state/actions/projectActions';

import ProjectCard from '../Widgets/Project';
import { SUCCESS } from '../../../state/statusTypes';

const mapStateToProps = (state) => ({
    projects: _.get(state, 'projects', {}),
    events: _.get(state, 'events', {}),
    animationVal: _.get(state, 'events.animationVal', null),
    numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

class ProjectFeed extends Component {
    componentDidMount() {
    /*
        this.props.setEventsFinished(dummyAPIData.eventsFinished);
        setInterval(_.throttle(this.props.incrementEventsFinished, 10), 250);
    */
        this.props.getProjects();
    }

    mapProjects = () => this.props.projects.status === SUCCESS && (
        _.map(this.props.projects.data, (project) => (
            <ProjectCard
                title={project.name}
                startDate={project.startDate}
                link={<Link className="btn btn-primary float-left" to={`/project/${project._id}`}>More details</Link>}
                key={project._id}
            >
                <p className="text-left">{project.description}</p>
            </ProjectCard>
        ))
    );

    showAddProjectButton() {
        return (
            <div className="col-4">
                <Link to="/addproject" >
                    <button 
                        type="button" 
                        className="btn btn-success float-right" 
                        data-toggle="modal" 
                        data-target="#exampleModal"
                    >
                        Add new project
                    </button>
                </Link>
            </div>
        );
    }

    showFeedHeader() {
        return (
            <div className="col-8">
                <h2>Projects You Are Involved In</h2>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row mb-2">
                    {this.showFeedHeader()}
                    {this.showAddProjectButton()}
                </div>
                <div className="row">
                    {this.mapProjects()}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { incrementEventsFinished, setEventsFinished, getProjects })(ProjectFeed);
