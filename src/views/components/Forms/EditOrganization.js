import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Validators, { required, email, length, numericality, url, format } from 'redux-form-validators';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { Input, TextArea, Select } from './utils/FormFields';
import { normalizePhone } from './utils/FormHelpers';
import { StateSelect } from './utils/StateSelect';
import { ERROR } from '../../../state/statusTypes';

Object.assign(Validators.defaultOptions, {
    allowBlank: true
})

class EditOrganization extends Component {
    showError() {
        const { updateOrgStatus, createOrgStatus, selectedOrg } = this.props;

        if (updateOrgStatus === ERROR || createOrgStatus === ERROR) {
            const errorMessage = _.get(selectedOrg, 'error.response.data.message', '');

            return (
                <p className="mt-3 mb-0 text-danger">
                    {errorMessage}
                </p>
            );
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Field
                    label="Name*"
                    name="name"
                    component={Input}
                    type="text"
                    validate={required()}
                />
                <div className="related-fields-container">
                    <Form.Row>
                        <Col>
                            <Field
                                label="Email"
                                name="contactInformation.email"
                                component={Input}
                                type="text"
                                validate={email()}
                            />
                        </Col>
                        <Col>
                            <Field
                                label="Phone Number"
                                name="contactInformation.phoneNumber"
                                component={Input}
                                type="text"
                                validate={format({ with: /^[2-9]\d{2}-\d{3}-\d{4}$/, message: "is not valid" })}
                                normalize={normalizePhone}
                            />
                        </Col>
                    </Form.Row>
                    <Field
                        label="Website"
                        name="website"
                        component={Input}
                        type="text"
                        validate={url()}
                    />
                </div>
                <div className="related-fields-container">
                    <Field
                        label="Street Address"
                        name="address.street"
                        component={Input}
                        type="text"
                    />
                    <Form.Row>
                        <Col>
                            <Field
                                label="City"
                                name="address.city"
                                component={Input}
                                type="text"
                            />
                        </Col>
                        <Col>
                            <Field
                                label="State"
                                name="address.state"
                                component={Select}
                            >
                                <option>Choose...</option>
                                <StateSelect />
                            </Field>
                        </Col>
                        <Col>
                            <Field
                                label="Zip code"
                                name="address.zipcode"
                                component={Input}
                                type="number"
                                validate={[numericality(), length({is: 5})]}
                            />
                        </Col>
                    </Form.Row>
                </div>
                <Field
                    label="Mission statement"
                    name="description"
                    component={TextArea}
                    rows={3}
                />
                <div className="submit-row">
                    <Button type="submit">Submit</Button>
                    <small>* Required</small>
                </div>
                {this.showError()}
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    organizations: _.get(state, 'organizations.data'),
    organizationStatus: _.get(state, 'organizations.status'),
    selectedOrg: _.get(state, 'organizations.selectedOrg'),
    createOrgStatus: _.get(state, 'organizations.selectedOrg.status.create'),
    updateOrgStatus: _.get(state, 'organizations.selectedOrg.status.update')
});

EditOrganization = connect(mapStateToProps)(EditOrganization);

export default reduxForm({
    form: 'EditOrganization',
    enableReinitialize: true
})(EditOrganization);
