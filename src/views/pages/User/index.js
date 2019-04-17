import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { SUCCESS, NOT_STARTED, LOADING } from '../../../state/statusTypes';
import EditUser from '../../components/Forms/EditUser';
import { getUserByID, deleteUser, updateUser } from '../../../state/actions/userActions';
import { logoutUser } from '../../../state/actions/authenticationActions';
import { getOrganizations, getOrganizationsById } from '../../../state/actions/organizationActions';

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/Loader';
import './User.scss';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditModal: false
        };
    }

    componentDidMount() {
        if (this.props.getUserStatus === SUCCESS) {
            this.props.getOrganizations();
        }
    }

    componentDidUpdate(prevProps) {
        const updateComplete = this.props.updateUserStatus === SUCCESS && prevProps.updateUserStatus === LOADING;

        if (updateComplete) {
            this.setState({ showEditModal: false })
        }
    }

    submitEdits = () => {
        const updates = _.get(this.props, 'form.values', {});
        this.props.updateUser(this.props.user._id, updates);
    };

    renderModal() {
        return (
            <Modal 
                show={this.state.showEditModal} 
                onHide={() => this.setState({ showEditModal: false })}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditUser
                        existingUser
                        initialValues={this.props.user}
                        onSubmit={this.submitEdits}
                    />
                </Modal.Body>
            </Modal>
        );
    }

    renderHeader(name) {
        return (
            <div className="user-header">
                <h1 className="user-name">{name}</h1>
            </div>
        )
    }

    renderEditButton() {
        return (
            <Button 
                variant="outline-success"
                className="edit-user-button"
                onClick={() => this.setState({ showEditModal: true })}
            >
                Edit profile
            </Button>
        )
    }

    renderContactInfo(email, website, city, state, phoneNumber) {
        const listItems = _.map(arguments, item => {
            const itemExists = !_.isUndefined(item) && !_.isEmpty(item);

            if (itemExists) {
                return (
                    <ListGroup.Item>
                        <div>{item}</div>
                    </ListGroup.Item>
                );
            }
        })

        return (
            <div className="contact">
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {listItems}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderDescription(description) {
        return (
            <div className="description">
                <Card>
                    <Card.Header>
                        <h5>About Me</h5>
                    </Card.Header>
                    <Card.Body>
                        {description}
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderOrganizations() {
        const organizations = _.filter(this.props.organizations.data, org => _.includes(org.memberIds, this.props.user._id));
        const organizationsOrMsg = !_.isEmpty(organizations)
            ? _.map(organizations, (organization, index) => this.renderOrgCard(organization, index))
            : <i>No organizations yet!</i>

        return (
            <div className="user-orgs">
                <Card>
                    <Card.Header>
                        <h5>Organizations</h5>
                    </Card.Header>
                    <Card.Body className="user-orgs-body">
                        {organizationsOrMsg}
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderOrgCard(organization, index) {
        const { name, _id, description } = organization;

        return (
            <Card key={index} className="org-card">
                <Card.Body className="org-card-body">
                    <div className="top">
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {_.truncate(description, { 'length': 250 })}
                        </Card.Text>
                    </div>
                    <Link to={`/organization/${_id}`}>
                        <Button 
                            variant="outline-success"
                            className="org-view-button"
                        >
                            View
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }

    render() {
        const { user, getUserStatus, updateUserStatus } = this.props;
        const { name, email, website, location, phoneNumber, description } = user;
        const hasContactInfo = email || website || phoneNumber || location;
        const nameExists = !_.isUndefined(name) && !_.isEmpty(name);

        if (getUserStatus === LOADING || updateUserStatus === LOADING) return <Loader />;

        return (
            <div className="user-page">
                {this.renderModal()}
                {this.renderHeader(nameExists ? name : email)}
                <hr />
                <div className="user-content">
                    <div className="side">
                        {this.renderEditButton()}
                        {hasContactInfo && this.renderContactInfo(email, website, location, phoneNumber)}
                    </div>
                    <div className="main">
                        {description && this.renderDescription(description)}
                        {this.renderOrganizations()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: _.get(state, 'user.data', {}),
    getUserStatus: _.get(state, 'user.status.get', NOT_STARTED),
    updateUserStatus: _.get(state, 'user.status.update', NOT_STARTED),
    deletedStatus: _.get(state, 'user.status.delete', NOT_STARTED),
    isLoaded: _.get(state, 'user.status', null) === SUCCESS,
    organizations: _.get(state, 'organizations', {}),
    form: _.get(state, 'form.EditUser'),
});

const mapDispatchToProps = {
    getUserByID, 
    getOrganizations,
    getOrganizationsById, 
    deleteUser, 
    logoutUser,
    updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
