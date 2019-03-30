import React from 'react';
import './Loader.scss'

const Loader = () => ( 
    <div className="lds-css ng-scope"> 
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Loader;