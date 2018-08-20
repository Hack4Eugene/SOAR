import React, { Component } from 'react';
import _ from 'lodash';
import Card from './Card';

class Tags extends Component {
    getTags = () => {
        if (!this.props.tags) {
            return (
                <div>Add some interests to find matches!</div>
            )
        }

        const colorClassess = [
            'success',
            'warning',
            'primary',
            'danger'
        ];

        const numColors = colorClassess.length;

        return _.map(this.props.tags, (tag, i) => {
            /*
                Index MOD array length is the perfect pattern for repeating array
                i % numColors = 0, 1, 2, 3, 0, 1, 2, 3...
            */
            const color = colorClassess[i % numColors];
            return <span className={`badge badge-pill badge-${color} mr-2`} key={i}>{_.toUpper(tag)}</span>;
        })
    };

    render() {
        return (
            <Card>
                <div className="card-header">
                    Interests
                </div>
                <div className="card-body">
                    {this.getTags()}
                </div>
            </Card>
        )
    }
}

export default Tags;
