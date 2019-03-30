import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/Loader';

import { getOrganizations } from '../../../state/actions/organizationActions';
import { SUCCESS } from '../../../state/statusTypes';

class OrganizationFeed extends Component {
    componentDidMount() {
        this.props.getOrganizations();
    }

    renderOrgs() {
        const { organizations } = this.props;

        if (organizations.status !== SUCCESS) {
            return <Loader />
        }

        return _.map(organizations.data, (org, i) => (
            <Card className="organization-card" key={`org-${i}`}>
                <Card.Body>
                    <h5>{org.name}</h5>
                    <p>{org.description}</p>
                    {this.renderOrgLinkButton(org._id)}
                </Card.Body>
            </Card>
        ))
    }

    renderOrgLinkButton(orgId) {
        return (
            <Link to={`/organization/${orgId}`}>
                <Button variant="outline-success">
                    View
                </Button>
            </Link>
        );
    }

    render() {
        return (
            <div className="organizations-feed">
                {this.renderOrgs()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    organizations: _.get(state, 'organizations', {})
});

const mapDispatchToProps = { 
    getOrganizations 
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationFeed);

