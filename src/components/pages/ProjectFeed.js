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
                <h2 className="m-4">Projects You Are Involved In</h2>

                <ProjectCard
                    title="Meal Prep Kitchen Team Building"
                    startDate="2 Days Ago"
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
                    startDate="4 Days Ago"
                    link={<Link className="btn btn-primary float-left" to="/feed">More Details</Link>}
                >
                    <p className = "text-left">We will spend the summer building up the flora around Eugene and Springfield, aiming for a beautiful bloom by this time next year!</p>
                </ProjectCard>
            </div>
        )
    }
}

export default connect(mapStateToProps, { incrementEventsFinished, setEventsFinished })(ProjectFeed);
