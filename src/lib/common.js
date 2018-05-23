import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import 'babel-polyfill';
import { API_ERROR } from '../state/types';
import { serviceHost, serviceRoutes }from '../config/routes';
import { logoutUser } from '../state/actions/index';

export const serialize = obj => JSON.stringify(obj);

export const getToken = state => _.get(state, 'authentication.token', '');

async function HttpClient(state, dispatch, opts) {
    return await axios.create({
        ...opts,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken(state)}` },
        timeout: 15000
    });
}

export {
    HttpClient
};

export const loadEndpoint = (state, route) => `${serviceHost[_.get(state, 'env', 'local')]}${route}`;

export const isValidToken = state => {
    const expirationDate = moment(_.get(state, 'authentication.expiresAt', moment()));
    return moment(expirationDate).isAfter(moment());
};
