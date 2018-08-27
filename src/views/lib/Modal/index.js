import React, { Component } from 'react';
import classNames from 'classnames';

import './styles.scss';

class Modal extends Component {
    render() {
        return (
            <div className={classNames('modal-container', { show: this.props.show })}>
                <div className="modal">
                        {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;
