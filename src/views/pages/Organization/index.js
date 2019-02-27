import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _, { get, map } from 'lodash';

import ToolBar from '../../lib/ToolBar';
import Modal from '../../lib/Modal';
import EditOrganization from '../../components/Forms/EditOrganization';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import defaultProfilePic from '../../../static/imgs/default-profile-pic.jpeg';

import { SUCCESS, NOT_STARTED } from '../../../state/statusTypes';
import { getOrganizationById, getOrganizationsById, updateOrganization, getOrgProjectsById } from '../../../state/actions/organizationActions';

import './Organization.scss';

class OrganizationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationID: this.props.computedMatch.params.id,
            showEditOrgModal: false
        };
        this.once = 0;
    }

    componentDidMount() {
        this.props.getOrganizationById(this.state.organizationID);
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.getOrgStatus === SUCCESS
            && this.props.getOrgProjectsStatus === NOT_STARTED
            && !_.isEmpty(this.props.organization.projectIds)
        ) {
            this.props.getOrgProjectsById(this.props.organization.projectIds)
        }

        const isModalShown = this.state.showEditOrgModal;
        const isNewOrgData = prevProps.organization !== this.props.organization;
        const isNewDataFinal = this.props.updateOrgStatus === SUCCESS;

        if (isModalShown && isNewOrgData && isNewDataFinal) {
            this.setState({ showEditOrgModal: false });
        }
    }

    toggleModal = () => {
        this.setState({ 
            showEditOrgModal: !this.state.showEditOrgModal 
        })
    }

    addUserToOrganization = () => {
        const { _id, memberIds } = this.props.organization;
        const newMemberIds = [ ...memberIds, this.props.userId ]
        this.props.updateOrganization(_id, { memberIds: newMemberIds });
    };

    submitEdits = () => {
        const updates = _.get(this.props, 'form.values', {});
        this.props.updateOrganization(this.props.organization._id, updates);
    };

    renderModal() {
        return (
            <Modal 
                show={this.state.showEditOrgModal} 
                hide={() => this.setState({ showEditOrgModal: !this.state.showEditOrgModal })}
            >
                <EditOrganization
                    initialValues={this.props.organization}
                    onSubmit={this.submitEdits}
                />
            </Modal>
        );
    }

    renderHeader(name) {
        return (
            <div className="org-header">
                <h1 className="org-name">{name}</h1>
            </div>
        )
    }

    renderContactInfo(address, website, contactInformation) {
        const { city, state } = address;
        const { email, phoneNumber } = contactInformation;

        return (
            <div className="contact">
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div>{`${city}, ${state}`}</div>
                            </ListGroup.Item>
                            {
                                email && 
                                <ListGroup.Item>
                                    <div>{email}</div>
                                </ListGroup.Item>
                            }
                            {
                                website && 
                                <ListGroup.Item>
                                    <a href={`https://${website}`}>{website}</a>
                                </ListGroup.Item>
                            }
                            {
                                phoneNumber && 
                                <ListGroup.Item>
                                    <div>{phoneNumber}</div>
                                </ListGroup.Item>
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderJoinButton(userIsMember) {
        return userIsMember ? (
            <Button 
                variant="outline-success"
                className="join-project-button"
            >
                You're a member!
            </Button>
        ) : (
            <Button 
                variant="outline-success"
                className="join-project-button"
                onClick={this.addUserToOrganization}
            >
                Request to join
            </Button>
        );
    }

    renderEditButton() {
        return (
            <Button 
                variant="outline-success"
                className="edit-org-button"
                onClick={this.toggleModal}
            >
                Edit organization
            </Button>
        )
    }

    renderDescription(description) {
        return (
            <div className="description">
                <Card>
                    <Card.Header>
                        <h5>Mission Statement</h5>
                    </Card.Header>
                    <Card.Body>
                        {description}
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderProjects(projects) {
        const projectsOrMsg = !_.isEmpty(projects)
            ? _.map(projects, (project, index) => this.renderProjectCard(project, index))
            : <i>No projects yet!</i>

        return (
            <div className="org-projects">
                <Card>
                    <Card.Header>
                        <h5>Projects</h5>
                    </Card.Header>
                    <Card.Body className="org-projects-body">
                        {projectsOrMsg}
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderProjectCard(project, index) {
        const { name, _id, description } = project;

        return (
            <Card key={index} className="project-card">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body className="project-card-body">
                    <div className="top">
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {_.truncate(description, { 'length': 250 })}
                        </Card.Text>
                    </div>
                    <Link to={`/project/${_id}`}>
                        <Button 
                            variant="outline-success"
                            className="project-view-button"
                        >
                            View
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }

    renderMembers(members) {
        const membersOrMsg = !_.isEmpty(members) 
            ? _.map(members, (member, index) => this.renderMember(member, index))
            : <i>No members yet!</i>

        return (
            <div className="org-members">
                <Card>
                    <Card.Header>
                        <h5>Members</h5>
                    </Card.Header>
                    <Card.Body className="org-members-body">
                        {membersOrMsg}
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderMember(member, index) {
        return (
            <div key={`member-${index}`} className="org-member">
                <img src={defaultProfilePic} />
                <div>{member.name}</div>
            </div>
        )
    }

    render() {
        const { 
            name, 
            address, 
            contactInformation, 
            description, 
            projects, 
            members, 
            memberIds, 
            website 
        } = this.props.organization;

        const userIsMember = _.includes(memberIds, this.props.userId);

        if (this.props.getOrgStatus !== SUCCESS) {
            return <div>Loading</div>
        }

        return (
            <div className="org-page">
                {this.renderModal()}
                {this.renderHeader(name, address, contactInformation, description)}
                <hr />
                <div className="org-content">
                    <div className="side">
                        {this.renderJoinButton(userIsMember)}
                        {this.renderEditButton()}
                        {this.renderContactInfo(address, website, contactInformation)}
                        {this.renderMembers(members)}
                    </div>
                    <div className="main">
                        {this.renderDescription(description)}
                        {this.renderProjects(projects.data)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
    posts: get(state, 'posts', {}),
    user: get(state, 'user', {}),
    organization: get(state, 'organizations.selectedOrg.data', {}),
    projects: get(state, 'organizations.selectedOrg.data.projects.data', []),
    projectsStatus: get(state, 'projects.projectsForOrganization.statusText', NOT_STARTED),
    updateOrgStatus: _.get(state, 'organizations.selectedOrg.status.update'),
    getOrgStatus: _.get(state, 'organizations.selectedOrg.status.get'),
    getOrgProjectsStatus: _.get(state, 'organizations.selectedOrg.data.projects.status', NOT_STARTED),
    projectIds: _.get(state, 'organizations.selectedOrg.data.0.projectIds'),
    form: _.get(state, 'form.EditOrganization'),
    userId: _.get(state, 'user.data._id', ''),
});

const mapDispatchToProps = { 
    getOrganizationById, 
    getOrganizationsById, 
    updateOrganization,
    getOrgProjectsById
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage);
