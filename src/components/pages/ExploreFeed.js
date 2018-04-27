import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash'

import Project from '../Project';
import EventsWidget from '../EventsWidget';

import {
    getEvents
} from '../../state/actions/index';

mapStateToProps = state => {
    _.get(state, 'events', {})
};

class ExploreFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: dummyAPIData.projects,
            displaying: 'projects'
        }
    }

    componentWillMount() {
        this.props.getEvents();
    }

    toggleTabs = (e, type) => {
        if (this.state.displaying === type) {
            return;
        }
        this.setState({ data: dummyAPIData[type], displaying: type })
    };

    getFeed = () => {
        if (this.state.displaying === 'projects') return this.getProjectsFeed();
        if (this.state.displaying === 'events') return this.getEventsFeed();
    };

    getProjectsFeed = () => {
        return _.map(this.state.data, (project, i) => {
            return (
                <Project
                    key={`explore-feed-project-${i}`}
                    feedView={true}
                    id={project.id}
                    title={project.title}
                    startDate={project.startDate}
                    description={project.description}
                    showProgress={false}
                />
            )
        })
    };

    getEventsFeed = () => <EventsWidget events={this.state.data} />;

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link
                            className="nav-item nav-link active"
                            id="nav-home-tab"
                            data-toggle="tab"
                            to="#"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                            onClick={e => this.toggleTabs(e, 'projects')}>Projects</Link>
                        <Link
                            className="nav-item nav-link"
                            id="nav-profile-tab"
                            data-toggle="tab"
                            to="#"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                            onClick={e => this.toggleTabs(e, 'events')}>Events</Link>
                    </div>
                </nav>
                {this.getFeed()}
            </div>
        )
    }
}

export default connect(mapStateToProps, { getEvents })(ExploreFeed);
