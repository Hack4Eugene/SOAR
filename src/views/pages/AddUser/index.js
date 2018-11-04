import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _, { get, cloneDeep } from 'lodash';

import Card from '../../lib/Card';

import { createUser } from '../../../state/actions/userActions';
import { getOrganizations } from '../../../state/actions/organizationActions';

import './AddUser.scss';
import { SUCCESS, NOT_STARTED } from '../../../state/statusTypes';

const mapStateToProps = (state) => ({
    user: get(state, 'user', {}),
    events: get(state, 'events', {}),
    posts: get(state, 'posts', {}),
    organizations: get(state, 'organizations', {})
});

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                name: '',
                username: '',
                password: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    country: ''
                },
                contactInformation: {
                    phoneNumber: '',
                    email: ''
                },
                website: '',
                description: '',
                organizations: []
            },
            submitted: null
        };
    }

    componentWillMount() {
        this.props.getOrganizations();
    }

    getOrganizationBox = () => {
        if (this.props.organizations.status !== SUCCESS) {
            return;
        }

        const { newUser } = this.state;


        return (
            <div className="form-group">
                <label htmlFor="organizations">Associated Organizations</label>
            <select
                multiple
                name="organizations"
                className="form-control" id="organizations"
                onChange={(e) => this.handleFormInput(e)}
            >
                {
                    _.map(this.props.organizations.data, (org, i) => (
                        <option value={org.name} key={i}>{org.name}</option>
                    ))
                }
            </select>
            <div>
                {_.map(_.get(newUser, 'organizations'), (org, i) => {
                    return (
                        <div className="organization select-confirmation d-flex justify-content-between align-items-center pl-4 pr-4 pt-2 pb-2" key={i}>
                            <p className="m-0">{org.name}</p>
                            <i
                                className="fas fa-times-circle"
                                onClick={() => this.removeAssociatedOrganization(i)}
                            />
                        </div>
                    );
                })}
            </div>
            </div>
        );
    };

    handleFormInput(e) {
        const tempUser = cloneDeep(this.state.newUser);

        switch (e.target.id) {
            case 'fullName':
                tempUser.name = e.target.value;
                this.setState({ newUser: tempUser });
                break;
            case 'userName':
                tempUser.username = e.target.value;
                this.setState({ newUser: tempUser });
                break;
            case 'password':
                tempUser.password = e.target.value;
                this.setState({ newUser: tempUser });
                break;
            case 'organizations': //eslint-disable-line no-case-declarations
                const orgs = _.get(tempUser, 'organizations');
                if (_.includes(_.map(orgs, 'name'), e.target.value)) {
                    return;
                }

                const org = _.find(this.props.organizations.data, organization => organization.name === e.target.value);

                const orgObj = {
                    id: org._id,
                    name: e.target.value
                };

                tempUser.organizations.push(orgObj);
                this.setState({ newUser: tempUser });
                break;
            default:
                break;
        }
    }

    removeAssociatedOrganization = i => {
        const tempUser = cloneDeep(this.state.newUser);
        tempUser.organizations = _.reduce(tempUser.organizations, (orgs, value, key) => {
            if (key === i) {
                return orgs;
            }
            orgs.push(value);
            return orgs;
        }, []);
        this.setState({ newUser: tempUser });
    };

    submitUser = () => {
        Promise.resolve(this.props.createUser(this.state.newUser))
            .then(res => this.setState({ newUser: this.props.user, submitted: true }));
    };

    redirectToExplore = () => <Redirect to="/explore" />;

    renderForm = () => {
        return (
            <Card>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text" className="form-control" id="fullName"
                            onChange={(e) => this.handleFormInput(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text" className="form-control" id="userName"
                            onChange={(e) => this.handleFormInput(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text" className="form-control" id="password"
                            onChange={(e) => this.handleFormInput(e)}
                        />
                    </div>
                    {this.getOrganizationBox()}

                    <button className="btn btn-primary" onClick={this.submitUser}>Submit</button>
                </div>
            </Card>
        );
    };

    render() {
        const shouldRedirect = this.state.submitted === true && _.get(this.props.user, 'status', NOT_STARTED) === SUCCESS;

        if (shouldRedirect) {
            return this.redirectToExplore();
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2 className="ml-3">New User Registration</h2>
                    </div>
                    <div className="col-3" />
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        {this.renderForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { createUser, getOrganizations })(AddUser);
