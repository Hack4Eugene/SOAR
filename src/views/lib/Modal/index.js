import React, { Component } from 'react';
import classNames from 'classnames';

import './styles.scss';

class Modal extends Component {
    render() {
        return (
            <div className={classNames('modal-container', { show: this.props.show })}>
                <div className="modal p-3" style={{ height: 'max-content', maxHeight: '95vh', borderRadius: '4px' }}>
                    <div onClick={this.props.hide} className="close-container align-self-end d-flex align-items-center">
                    <div className="close-button">
                        <p className="m-0 mr-2">Close</p>
                        <i className="fas fa-times" />
                    </div>
                        
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;
