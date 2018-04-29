import axios from 'axios';
import _ from 'lodash';
import { serviceHost, serviceRoutes }from '../config/routes';

export const request = opts => {
    return axios({
        ...opts,
        headers: { 'Content-Type': 'Application/JSON', ...opts.headers }
    });
};

export const loadEndpoint = (env, route) => `${serviceHost[env]}${route}`;