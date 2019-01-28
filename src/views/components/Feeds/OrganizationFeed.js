import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getOrganizations } from '../../../state/actions/organizationActions';
import { OrganizationItem } from '../Widgets/Organization';
import { SUCCESS } from '../../../state/statusTypes';

const mapStateToProps = (state) => ({
    organizations: _.get(state, 'organizations', {})
});

class OrganizationFeed extends Component {
    componentDidMount() {
    /*
        this.props.setEventsFinished(dummyAPIData.eventsFinished);
        setInterval(_.throttle(this.props.incrementEventsFinished, 10), 250);
    */
        this.props.getOrganizations();
    }

    mapOrganizations = () => this.props.organizations.status === SUCCESS && (
        _.map(this.props.organizations.data, (organization) => (
            <div className="mb-4 ml-3 mr-3 w-100" key={organization._id}>
                <OrganizationItem organization={organization} />
            </div>
        ))
    );

    showAddOrganizationButton() {
        return (
            <div className="col-4">
                <Link to="/addorganization" >
                    <button 
                        type="button" 
                        className="btn btn-success float-right" 
                        data-toggle="modal" 
                        data-target="#exampleModal"
                    >
                        Add new organization
                    </button>
                </Link>
            </div>
        );
    }

    showFeedHeader() {
        return (
            <div className="col-8">
                <h2>Organizations</h2>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row mb-2">
                    {this.showFeedHeader()}
                    {this.showAddOrganizationButton()}
                </div>
                <div className="row">
                    {this.mapOrganizations()}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, { getOrganizations })(OrganizationFeed);
