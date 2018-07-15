import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import _ from 'lodash'

import ProjectFeed from './ProjectFeed';
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
        const { getProjectsFeed, getEventsFeed } = this;
        if (this.state.displaying === 'projects') return getProjectsFeed();
        if (this.state.displaying === 'events') return getEventsFeed();
        if (this.state.displaying === 'organizations') return null;
    };

    getProjectsFeed = () => {
        return <ProjectFeed />
    };

    getEventsFeed = () => {
        const { events } = this.props;
        return <EventsWidget events={events.data} />;
    };

    render() {
        if (!this.props[this.state.displaying].data || this.props[this.state.displaying].data.length <= 0 ) return <div />;
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
