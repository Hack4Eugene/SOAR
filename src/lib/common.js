import axios from 'axios';
import _ from 'lodash';
import 'babel-polyfill';
import { API_ERROR } from '../state/types';
import { serviceHost, serviceRoutes }from '../config/routes';
import { logoutUser } from '../state/actions/index';

async function HttpClient(state, dispatch, opts) {
    const newAxios = await axios.create({
        ...opts,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${_.get(state, 'authentication.token')}` },
        timeout: 15000
    });
    newAxios.interceptors.response.use(function (res) {
        return res
    }, function (err) {
        console.log(err);
        if (_.get(JSON.stringify(), 'status', 401) === 401) {
            dispatch(logoutUser({ isTokenExpired: true, isLoggedIn: false }));
            return err;
        } else {
            return Promise.error(err);
        }
    });
    return newAxios;
}

export {
    HttpClient
};

export const loadEndpoint = (env, route) => `${serviceHost[env]}${route}`;