import axios from 'axios';
import _ from 'lodash';
import { serviceHost, serviceRoutes }from '../config/routes';

export const request = opts => axios({
    ...opts,
    headers: { 'Content-Type': 'Application/JSON' }
});

export const loadEndpoint = route => `${serviceHost}${route}`;