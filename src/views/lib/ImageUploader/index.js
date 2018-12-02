import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import Modal from '../Modal';

class ImageUploader extends Component {
    render() {
        return (
            <Modal hide={this.props.hide} show={this.props.show} height={'300px'}>
                <div>
                    <h4>Choose an image <span className="fas fa-file" /></h4>
                    <form onSubmit={this.props.handleSubmit}>
                        <Field
                            name="image"
                            component={CustomFileField}
                        />
                        <button type="submit" value="Upload">Upload</button>
                    </form>
                </div>
            </Modal>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.image) {
        errors.image = 'No file entered';
    }

    if (_.isArray(values.image) && !(values.image[0] instanceof File)) {
        errors.image = 'invalid image value';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'ImageUpload',
    enableReinitialize: true
})(ImageUploader);

ImageUploader.propTypes = {
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired
};

const CustomFileField = props => {
    return (
        <input
            {..._.omit(props.input, 'value')}
            type="file"
            files={props.value}
            onChange={e => {
                e.preventDefault();
                return props.input.onChange([...e.target.files]);
            }}
        />
    );
};
