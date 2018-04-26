import axios from 'axios';
import _ from 'lodash';
import serviceConfig from '../config/routes';

export const request = opts => axios({
    ...opts,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loadEndpoint = path => _.get(serviceConfig.serviceRoutes, path, null);