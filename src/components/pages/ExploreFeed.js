import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import _ from 'lodash'

import Project from '../Project';
import EventsWidget from '../EventsWidget';

import {
    getEvents,
    getProjects,
    getOrganizations
} from '../../state/actions/index';

const mapStateToProps = state => ({
    events: _.get(state, 'events', {}),
    projects: _.get(state, 'projects', {}),
    organizations: _.get(state, 'organizations', {})
});

class ExploreFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            displaying: 'events'
        }
    }

    componentWillMount() {
        this.props.getEvents();
        this.props.getProjects();
        this.props.getOrganizations();
    }

    toggleTabs = (type) => {
        if (this.state.displaying === type) {
            return;
        }
        this.setState({ data: this.props[type].data, displaying: type })
    };

    getFeed = () => {
        if (this.state.displaying === 'projects') return this.getProjectsFeed();
        if (this.state.displaying === 'events') return this.getEventsFeed();
        if (this.state.displaying === 'organizations') return null;
    };

    getProjectsFeed = () => {
        return _.map(this.props.projects.data, (project, i) => {
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

    getEventsFeed = () => <EventsWidget events={this.props.events.data} />;

    render() {
        console.log(this.state, this.props);
        return (
            <div className="container">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <div className="p-3" id="tabs-background" style={{ borderTop: '1px solid #ddd', marginTop: '15px' }}>
                            <ul className="nav nav-pills justify-content-start" id="practice-areas-tabs">
                                <li className="nav-item">
                                    {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                                    <a
                                        onClick={e => this.toggleTabs('events')}
                                        className={classnames('nav-link', {
                                            'active': this.state.displaying === 'events'
                                        })}
                                        href="#"
                                    >
                                        Events
                                    </a>
                                </li>
                                <li className="nav-item">
                                    {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                                    <a
                                        onClick={e => this.toggleTabs('projects')}
                                        className={classnames('nav-link', {
                                            'active': this.state.displaying === 'projects'
                                        })}
                                        href="#"
                                    >
                                        Projects
                                    </a>
                                </li>
                                <li className="nav-item">
                                    {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                                    <a
                                        onClick={e => this.toggleTabs('organizations')}
                                        className={classnames('nav-link', {
                                            'active': this.state.displaying === 'organizations'
                                        })}
                                        href="#"
                                    >
                                        Organizations
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.getFeed()}
            </div>
        )
    }
}

export default connect(mapStateToProps, { getEvents, getProjects, getOrganizations })(ExploreFeed);
