import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get, cloneDeep } from 'lodash';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { SUCCESS } from '../../../state/statusTypes';
import { addOrganization } from '../../../state/actions/organizationActions';
import EditOrganization from '../../components/Forms/EditOrganization';

import './AddOrganization.scss';

class AddOrganization extends Component {
    submitOrganization = () => {
        const values = get(this.props.form, 'values', {});
        this.props.addOrganization(values);
    }

    renderForm() {
        return (
            <Card>
                <Card.Body>
                    <EditOrganization onSubmit={this.submitOrganization} />
                </Card.Body>
            </Card>
        );
    }

    redirectToCreatedOrg = () => {
        const { selectedOrganization } = this.props;
        const organizationId = _.get(selectedOrganization, 'data._id', '');

        return <Redirect to={`/organization/${organizationId}`} />
    };

    render() {
        const shouldRedirect = this.props.createOrganizationStatus === SUCCESS

        if (shouldRedirect) {
            return this.redirectToCreatedOrg();
        }

        return (
            <div className="add-organization-page">
                <div className="add-organization-header">
                    <h2>Create Organization</h2>
                    <Link to="/explore#organizations">
                        <Button
                            type="button" 
                            variant="outline-success"
                        >
                            Back to Organizations
                        </Button>
                    </Link>
                </div>
                {this.renderForm()}          
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status'),
    selectedOrganization: _.get(state, 'organizations.selectedOrg'),
    createOrganizationStatus: _.get(state, 'organizations.selectedOrg.status.create'),
    form: get(state, 'form.EditOrganization')
});

export default connect(mapStateToProps, { addOrganization })(AddOrganization);
