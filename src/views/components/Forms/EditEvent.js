import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Validators, { required } from 'redux-form-validators';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { Input, TextArea, Select, List } from './utils/FormFields';
import { StateSelect } from './utils/StateSelect';
import { getProjects } from '../../../state/actions/projectActions';
import { SUCCESS, ERROR } from '../../../state/statusTypes';

Object.assign(Validators.defaultOptions, {
    allowBlank: true
})

class EditEvent extends Component {
    state = {
        tags: [],
        tagToAdd: ''
    }

    componentDidMount() {
        this.props.getProjects();
    }

    showError() {
        const { updateEventStatus, createEventStatus, selectedEvent } = this.props;

        if (updateEventStatus === ERROR || createEventStatus === ERROR) {
            const errorMessage = _.get(selectedEvent, 'error.response.data.message', '');

            return (
                <p className="mt-3 mb-0 text-danger">
                    {errorMessage}
                </p>
            );
        }
    }

    addTag = () => {
        const { tags, tagToAdd } = this.state;

        if (tagToAdd.trim() !== '' && !tags.includes(tagToAdd)) {
            const newTags = tags;
            newTags.push(tagToAdd);
    
            this.setState({ 
                tags: newTags,
                tagToAdd: ''
            })
        }
    }

    removeTag = tagToDelete => {
        const { tags } = this.state;
        const newTags = tags.filter(tag => tag !== tagToDelete)

        this.setState({ tags: newTags });
    }

    render() {
        if (this.props.projectStatus !== SUCCESS) return <div>Loading...</div>;

        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Field
                    label="Name*"
                    name="name"
                    component={Input}
                    type="text"
                    validate={required()}
                />
                <Field
                    label="Project*"
                    name="projectId"
                    component={Select}
                    validate={required()}
                >
                    <option>Project...</option>
                    {_.map(this.props.projects, project => (
                        <option value={project._id} key={project._id}>{project.name}</option>
                    ))}
                </Field>
                <div className="related-fields-container">
                    <Form.Row>
                        <Col>
                            <Field
                                label="Date*"
                                name="date"
                                component={Input}
                                type="date"
                                validate={required()}
                            />
                        </Col>
                        <Col>
                            <Field
                                label="Start time*"
                                name="startTime"
                                component={Input}
                                type="time"
                                validate={required()}
                            />
                        </Col>
                        <Col>
                            <Field
                                label="End time"
                                name="endTime"
                                component={Input}
                                type="time"
                            />
                        </Col>
                    </Form.Row>
                </div>
                <div className="related-fields-container">
                    <Field
                        label="Street Address*"
                        name="address.street"
                        component={Input}
                        type="text"
                        validate={required()}
                    />
                    <Form.Row>
                        <Col>
                            <Field
                                label="City*"
                                name="address.city"
                                component={Input}
                                type="text"
                                validate={required()}
                            />
                        </Col>
                        <Col>
                            <Field
                                label="State*"
                                name="address.state"
                                component={Select}
                                validate={required()}
                            >
                                <option>Choose...</option>
                                <StateSelect />
                            </Field>
                        </Col>
                        <Col>
                            <Field
                                label="Zip code*"
                                name="address.zipCode"
                                component={Input}
                                type="number"
                                validate={required()}
                            />  
                        </Col>
                    </Form.Row>
                </div>
                <Field
                    label="Description"
                    name="description"
                    component={TextArea}
                    type="text"
                    rows={3}
                />
                {/* <Field
                    label="Tags"
                    name="tags"
                    component={List}
                    type="text"
                    normalize={value => value.split(',')}
                /> */}
                {/* <Form.Group>
                    <Form.Label>tags</Form.Label>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                        <Form.Control 
                            type="text"
                            onChange={e => this.setState({ tagToAdd: e.target.value })} 
                            value={this.state.tagToAdd}
                            placeholder="Enter one tag at a time"
                        />
                        <Button 
                            variant="outline-success" 
                            style={{ marginLeft: '1rem' }}
                            onClick={this.addTag}
                        >
                            Add tag
                        </Button>
                    </div>
                    <div className="form-tags">
                        {this.state.tags.map(tag => (
                            <h5 className="tag" key={tag}>
                                <Badge className="text" variant="secondary">{tag}</Badge>
                                <Badge 
                                    className="delete" 
                                    variant="light"
                                    onClick={() => this.removeTag(tag)}
                                >
                                    <i className="fas fa-times" />
                                </Badge>
                            </h5>
                        ))}
                    </div>
                </Form.Group>
                <Field
                    label="Goals"
                    name="goals"
                    component={Input}
                    type="text"
                    normalize={value => value.split(',')}
                /> */}
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
    projects: _.orderBy(_.get(state, 'projects.data', []), 'name'),
    projectStatus: _.get(state, 'projects.status'),
    selectedEvent: _.get(state, 'events.selectedEvent'),
    createEventStatus: _.get(state, 'events.selectedEvent.status.create'),
    updateEventStatus: _.get(state, 'events.selectedEvent.status.update')
});

EditEvent = connect(mapStateToProps, { getProjects })(EditEvent);

export default reduxForm({
    form: 'EditEvent',
    enableReinitialize: true
})(EditEvent);
