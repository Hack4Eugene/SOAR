import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get, cloneDeep } from 'lodash';

import Card from '../../lib/Card';
import { SUCCESS } from '../../../state/statusTypes';
import { addOrganization } from '../../../state/actions/organizationActions';
import EditOrganization from '../../components/Forms/EditOrganization';

class AddOrganization extends Component {
    submitOrganization = () => {
        const values = get(this.props.form, 'values', {});
        this.props.addOrganization(values);
    }

    renderForm() {
        return (
            <Card>
                <div className="card-body">
                    <EditOrganization onSubmit={this.submitOrganization} />
                </div>
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
            <div className="container">                    
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2 className="ml-3">Add Organization</h2>
                    </div>
                    <div className="col-3">
                        <Link to="/organizations">
                            <button
                                type="button" 
                                className="btn btn-success float-right" 
                                data-toggle="modal" 
                                data-target="#exampleModal"
                            >
                                Back to Organizations
                            </button>
                        </Link>
                    </div>
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

const mapStateToProps = (state) => ({
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status'),
    selectedOrganization: _.get(state, 'organizations.selectedOrg'),
    createOrganizationStatus: _.get(state, 'organizations.selectedOrg.status.create'),
    form: get(state, 'form.EditOrganization')
});

export default connect(mapStateToProps, { addOrganization })(AddOrganization);
