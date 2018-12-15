import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="card mb-4">
                {this.props.children}
            </div>
        );
    }
}

export default Card;
