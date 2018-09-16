import React, { Component } from 'react';
import classNames from 'classnames';

import './styles.scss';

class Modal extends Component {
    render() {
        return (
            <div className={classNames('modal-container', { show: this.props.show })}>
                <div className="modal p-3">
                    <div onClick={this.props.hide} className="close-container align-self-end d-flex align-items-center">
                        <p className="m-0 mr-2">Close</p>
                        <i className="fas fa-times" />
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;
