import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Input = ({ label, input, type, meta }) => {
    return (
        <Form.Group>
            {renderLabel(label)}
            <Form.Control 
                type={type} 
                onChange={input.onChange} 
                value={input.value} 
            />
            { 
                meta.error && meta.touched && 
                renderErrorText(label, meta.error)
            }
        </Form.Group>
    )
}

export const TextArea = ({ label, input, type, meta, rows, placeholder }) => {
    return (
        <Form.Group>
            {renderLabel(label)}
            <Form.Control 
                type={type} 
                onChange={input.onChange} 
                value={input.value} 
                placeholder={placeholder}
                as="textarea"
                rows={rows}
            />
            { 
                meta.error && meta.touched && 
                renderErrorText(label, meta.error)
            }
        </Form.Group>
    )
}

export const Select = ({ label, input, type, meta, children }) => {
    return (
        <Form.Group>
            {renderLabel(label)}
            <Form.Control 
                type={type} 
                onChange={input.onChange} 
                value={input.value} 
                as="select"
            >
                {children}
            </Form.Control>
            { 
                meta.error && meta.touched && 
                renderErrorText(label, meta.error)
            }
        </Form.Group>
    )
}

export const SelectMultiple = ({ label, input, type, meta, children }) => {
    return (
        <Form.Group>
            {renderLabel(label)}
            <Form.Control 
                type={type} 
                onChange={input.onChange} 
                value={input.value} 
                as="select"
                multiple
            >
                {children}
            </Form.Control>
            { 
                meta.error && meta.touched && 
                renderErrorText(label, meta.error)
            }
        </Form.Group>
    )
}

export const List = ({ label, input, type, meta, list }) => {
    return (
        <Form.Group>
            {renderLabel(label)}
            <Form.Control 
                type={type} 
                onChange={input.onChange} 
                value={input.value} 
            />
            { 
                meta.error && meta.touched && 
                renderErrorText(label, meta.error)
            }
        </Form.Group>
    )
}

const renderErrorText = (label, error) => (
    <Form.Text className="form-error-text">
        {`${label.replace('*', '').toLowerCase()} ${error}`}
    </Form.Text>
)

const renderLabel = (label) => (
    <Form.Label>
        {label.toLowerCase()}
    </Form.Label>
)