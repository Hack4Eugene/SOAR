import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import Validators, { required, email, length, numericality, url, format } from 'redux-form-validators';
import { connect } from 'react-redux';
import _ from 'lodash';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Input, TextArea } from './utils/FormFields';
import { normalizePhone } from './utils/FormHelpers';
import { ERROR } from '../../../state/statusTypes';

Object.assign(Validators.defaultOptions, {
    allowBlank: true
})

class EditUser extends Component {
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
        const { newUser, existingUser } = this.props;

        return (
            <Form onSubmit={this.props.handleSubmit}>
                { newUser &&
                    <Fragment>
                        <Field
                            label="Email"
                            name="email"
                            component={Input}
                            type="text"
                            validate={[required(), email()]}
                        />
                        <Field
                            label="Password"
                            name="password"
                            component={Input}
                            type="password"
                            validate={[required(), length({ min: 6 })]}
                        />
                    </Fragment>
                }
                { existingUser &&
                    <Fragment>
                        <Field
                            label="Full Name"
                            name="name"
                            component={Input}
                            type="text"
                        />
                        <Form.Row>
                            <Col>
                                <Field
                                    label="Phone Number"
                                    name="phoneNumber"
                                    component={Input}
                                    type="text"
                                    validate={format({ with: /^[2-9]\d{2}-\d{3}-\d{4}$/, message: "is not valid" })}
                                    normalize={normalizePhone}
                                />
                            </Col>
                            <Col>
                                <Field
                                    label="Zip code"
                                    name="zipCode"
                                    component={Input}
                                    type="number"
                                    validate={[numericality(), length({is: 5})]}
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
                        <Field
                            label="About Me"
                            name="description"
                            component={TextArea}
                            rows={3}
                        />
                    </Fragment>
                }
                <div className="submit-row">
                    <Button type="submit">Submit</Button>
                    {/* <small>* Required</small> */}
                </div>
                {/* {this.showError()} */}
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: _.get(state, 'user.data', {})
});

EditUser = connect(mapStateToProps)(EditUser);

export default reduxForm({
    form: 'EditUser',
    enableReinitialize : true
})(EditUser);
