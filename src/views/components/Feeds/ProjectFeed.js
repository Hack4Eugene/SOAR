import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

import { incrementEventsFinished, setEventsFinished, getProjects } from '../../../state/actions/index';

import ProjectCard from '../Widgets/Project';
import { SUCCESS } from '../../../state/statusTypes';

const dummyAPIData = {
    project: [
        {
            id: 'abcd123',
            title: 'Homelessness Awareness Initiative',
            startDate: `${moment().diff(moment(1522924450), 'days')} days ago`,
            numFinishedEvents: 12,
            totalEvents: 30,
            description: "Come out so this event, It's going to be the best!"
        }
    ],
    eventsFinished: 20
};

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
        this.props.getProjects()
    }

    mapProjects = () => this.props.projects.status === SUCCESS && (
        _.map(this.props.projects.data, (project) => (
            <ProjectCard
                title={project.name}
                startDate={project.startDate}
                link={<Link className="btn btn-primary float-left" to={`/project/${project._id}`}>More Details</Link>}
                key={project._id}
            >
                <p className="text-left">{project.description}</p>
            </ProjectCard>
        ))
    );

    render() {
        return (
            <div className="container">
                <h2 className="m-4">Projects You Are Involved In</h2>
                {this.mapProjects()}
            </div>
        )
    }
}

export default connect(mapStateToProps, { incrementEventsFinished, setEventsFinished, getProjects })(ProjectFeed);

/*
 <ProjectCard
 title="Harvest to Home Project"
 startDate="3 Weeks Ago"
 link={<Link className="btn btn-primary float-left" to="/project/">More Details</Link>}
 >
 <p className = "text-left">This spring, various groups in our network will collaborate in the entire process of growing, harvesting, and distributing food to local underserved youth. Join us for the whole series, or pick a single event from our timeline below!</p>
 </ProjectCard>

 <ProjectCard
 title="Meal Prep Kitchen Team Building"
 startDate="2 Months Ago"
 link={<Link className="btn btn-primary float-left" to="/feed">More Details</Link>}
 >
 <div className="row justify-content-end align-items-center">
 <div className="col-3">
 <div className="progress float-center">
 <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: `${(this.props.events.animationVal/dummyAPIData.project[0].totalEvents)*100}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
 </div>
 </div>
 {dummyAPIData.eventsFinished && (
 <div className="col-1">
 <p className="m-0">{this.props.events.animationVal}/{dummyAPIData.project[0].totalEvents}</p>
 </div>
 )}
 </div>
 <p className="text-left">This project was created to address the long-standing issues around homelessness in Eugene and to build a community around our neighbors without addresses.</p>
 </ProjectCard>

 <ProjectCard
 title="Friends of Trees Summer Soilworks"
 startDate="8 Months Ago"
 link={<Link className="btn btn-primary float-left" to="/feed">More Details</Link>}
 >
 <p className = "text-left">We will spend the summer building up the flora around Eugene and Springfield, aiming for a beautiful bloom by this time next year!</p>
 </ProjectCard>
 */
