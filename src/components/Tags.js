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

        let index = 0;
        return _.map(this.props.tags, (tag, i) => {
            const color = colorClassess[index % numColors]; // index MOD array length is the perfect pattern for repeating array.
            const badge = <span className={`badge badge-pill badge-${color} mr-2`} key={i}>{_.toUpper(tag)}</span>;
            index++;
            return badge;
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
