import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

import { incrementEventsFinished, setEventsFinished } from '../../state/actions/index';

import ProjectCard from '../ProjectCard';

const dummyAPIData = {
    project: [
        {
            id: 'abcd123',
            title: 'Some Project Name',
            startDate: `${moment().diff(moment(1522924450), 'days')} days ago`,
            numFinishedEvents: 12,
            totalEvents: 30,
            description: "Come out so this event, It's going to be the best!"
        }
    ],
    eventsFinished: 20
};

const mapStateToProps = (state) => ({
    events: _.get(state, 'events', {}),
    animationVal: _.get(state, 'events.animationVal', null),
    numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

class ProjectFeed extends Component {
    componentWillMount() {
        this.props.setEventsFinished(dummyAPIData.eventsFinished);
    }

    componentDidMount() {
        setInterval(_.throttle(this.props.incrementEventsFinished, 10), 250);
    }

    render() {
        return (
            <div className="container">
                <h2 className="m-4">Projects You Follow</h2>

                <ProjectCard
                    title="Some Project Name"
                    startDate="2 Days Ago"
                    link={<Link className="btn btn-primary" to="/feed">More Details</Link>}
                >
                    <div className="row justify-content-end align-items-center">
                        <div className="col-3">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: `${(this.props.events.animationVal/dummyAPIData.project[0].totalEvents)*100}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </div>
                        {dummyAPIData.eventsFinished && (
                            <div className="col-1">
                                <p className="m-0">{this.props.events.animationVal}/{dummyAPIData.project[0].totalEvents}</p>
                            </div>
                        )}
                    </div>
                    <p>Come out so this event, It's going to be the best!</p>
                </ProjectCard>

                <ProjectCard
                    title="Another Project Title"
                    startDate="4 Days Ago"
                    link={<Link className="btn btn-primary" to="/feed">More Details</Link>}
                >
                    <p>This is an event that differs from the first!</p>
                </ProjectCard>
            </div>
        )
    }
}

export default connect(mapStateToProps, { incrementEventsFinished, setEventsFinished })(ProjectFeed);
