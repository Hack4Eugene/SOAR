import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import { get, filter, isEqual, isArray } from 'lodash';

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
    componentWillMount() {
        if (this.props.isLoaded) {
			console.log(this.props.profile.organization);
			const org = get(this.props.profile, 'organization.id')
            this.props.getOrganizationsById([org]);
        }
    }
    render() {
        console.log({ profile: this.props.profile });
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

                        {/*TODO: Turn this into a toggling content body component*/}
                        {/*TODO: Will need to refactor HTML mockup to make it work*/}
                        <div className="card">
                            <div className="card-header">
                                Menu
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Events</li>
                                <li className="list-group-item">Projects</li>
                                <li className="list-group-item active">Organizations</li>
                                <li className="list-group-item">Settings</li>
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