import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import Card from '../../../lib/Card';

const OrganizationItem = ({ organization }) => {
    return (
        <Card>
            <div className="card-header">{organization.created_at || <i>No creation date</i>}</div>
            {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
            <div className="card-body">
                <h4 className="card-title mb-0">{organization.name}</h4>
                <br />
                <p className="card-text">
                    {organization.description}
                </p>
                <Link className="btn btn-primary float-left" to={`/organization/${organization._id}`}>More details</Link>
            </div>
        </Card>
    );
};

const NoOrganizations = () => {
    return (
        <p className="font-italic m-3">No organizations yet!</p>
    );
};

const OrganizationsWidget = ({ organizations }) => {
    const OrganizationList = organizations.length
        ? map(organizations, organization =>
            (<div className="mb-4" key={organization._id}>
                <OrganizationItem organization={organization} />
            </div>))
        : <NoOrganizations />;

    return (
        <div>
            {OrganizationList}
        </div>
    );
};

export default OrganizationsWidget;
