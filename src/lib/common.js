import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import 'babel-polyfill';
import { serviceHost } from '../config/routes';

export const serialize = obj => JSON.stringify(obj);

export const getToken = state => _.get(state, 'authentication.token', '');

export const HttpClient = async function (state, dispatch, opts) {
    return await axios.create({
        ...opts,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken(state)}` },
        timeout: 15000
    });
};

export const loadEndpoint = (state, route) => `${serviceHost[state || 'local']}${route}`;

export const isValidToken = state => {
    const expirationDate = moment(_.get(state, 'authentication.expiresAt', moment()));
    return moment(expirationDate).isAfter(moment());
};
