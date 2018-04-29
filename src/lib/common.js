import axios from 'axios';
import _ from 'lodash';
import { API_ERROR } from '../state/types';
import { serviceHost, serviceRoutes }from '../config/routes';

export const request = ({ ...opts }) =>
    axios({
        ...opts,
        headers: { 'Content-Type': 'application/JSON', ...opts.headers }
    });

export const loadEndpoint = (env, route) => `${serviceHost[env]}${route}`;