import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _, { get, filter, isEqual, isArray } from 'lodash';
import moment from 'moment';
import classnames from 'classnames';


import { SUCCESS } from '../../state/statusTypes';

import { getUserByID, getOrganizationsById } from '../../state/actions/index.js';
import Card from '../Card';
import EventsWidget from '../EventsWidget';

import parkImg from '../../static/imgs/food.jpg';
import foodLaneImg from '../../static/imgs/food-lane-county.jpg';
import peaceImg from '../../static/imgs/peace-corps.jpg';
import habitatImg from '../../static/imgs/habitat-humanity.png';
import userImg from '../../static/imgs/user-image.png';
import Tags from '../Tags';

const mapStateToProps = (state) => ({
    profile: get(state, 'user', {}),
    isLoaded: get(state, 'user.status', null) === SUCCESS
});

class UserProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    name: 'events',
                    active: true
                },
                {
                    name: 'projects',
                    active: false
                },
                {
                    name: 'organizations',
                    active: false
                },
                {
                    name: 'settings',
                    active: false
                }
            ]
        }
    }
    componentWillMount() {
        if (this.props.isLoaded) {
			const org = get(this.props.profile, 'organization.id');
            this.props.getOrganizationsById([org]);
        }
    }

    getActiveTab = () => _.find(this.state.tabs, 'active');
    setActiveTab = newTab => {
        const tabState = _.reduce(this.state.tabs, (tabs, value, key) => {
            const tabInIndex = this.state.tabs[key];
            const active = tabInIndex.name === newTab ? true : null;

            tabs[key] = {
                name: tabInIndex.name,
                active: _.isBoolean(active) ? active : false
            };
            return tabs;
        }, []);
        this.setState({ tabs: tabState })
    };

    isActiveTab = tab => tab === this.getActiveTab().name;

    render() {
        const {
            name,
            username,
            organization,
            createdAt
        } = this.props.profile;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1">
                        <img src={userImg} className="user-image"/>
                    </div>
                    <div className="col">
                        <h1>{name}</h1>
                        <i>Member since {moment(createdAt).format('YYYY')}</i>
                    </div>

                </div>
                <hr className="my-4"/>
                <div className="row">
                    <div className="col-3">

                        <div className="card">
                            <div className="card-header">
                                Menu
                            </div>
                            <ul className="list-group list-group-flush">
                                <li
                                    className={classnames('list-group-item', {
                                        'active': this.isActiveTab('events')
                                    })}
                                    onClick={() => this.setActiveTab('events')}
                                >Events</li>
                                <li  className={classnames('list-group-item', {
                                        'active': this.isActiveTab('projects')
                                    })}
                                     onClick={() => this.setActiveTab('projects')}
                                >Projects</li>
                                <li
                                    className={classnames('list-group-item', {
                                        'active': this.isActiveTab('organizations')
                                    })}
                                    onClick={() => this.setActiveTab('organizations')}
                                >Organizations</li>
                                <li
                                    className={classnames('list-group-item', {
                                        'active': this.isActiveTab('settings')
                                    })}
                                    onClick={() => this.setActiveTab('settings')}
                                >Settings</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <Card>

                            <div className="card-header">
                                Member of 3 Organizations
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>
                                        <img className="card-image card-org-image" src={foodLaneImg}/>
                                        <div className="card-body org-card-body">
                                            <Link className="btn btn-outline-success org-card-button" to="/profile">Go
                                                to organization</Link>
                                        </div>
                                    </div>
                                    <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>


                                        <img className="card-image card-org-image" src={habitatImg}/>
                                        <div className="card-body org-card-body">
                                            <Link className="btn btn-outline-success org-card-button" to="/profile">Go
                                                to organization</Link>
                                        </div>
                                    </div>
                                    <div className="card col p-0 ml-3 mb-3" style={{ width: '10rem' }}>


                                        <img className="card-image card-org-image" src={peaceImg}/>
                                        <div


                                            className="card-body org-card-body">
                                            <Link className="btn btn-outline-success org-card-button" to="/profile">Go
                                                to organization</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, { getUserByID, getOrganizationsById })(UserProfilePage);