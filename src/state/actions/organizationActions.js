import _ from 'lodash';

import { HttpClient, loadEndpoint, serialize } from '../../lib/common';
import {
    ADD_ORG_REJECTED,
    ADD_ORG_RESOLVED,
    GET_ORG_ID_REJECTED,
    GET_ORG_ID_RESOLVED, GET_ORGANIZATIONS_REJECTED,
    GET_ORGANIZATIONS_RESOLVED
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_ORGANIZATIONS, POST_ORGANIZATION, GET_ORGANIZATION_BY_ID } = serviceRoutes;

export const getOrganizations = organizationIds => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATIONS)))
            .then(result => dispatch({ type: GET_ORGANIZATIONS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORGANIZATIONS_REJECTED, payload: err }));
    };
};

export const addOrganization = (org) => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.post(
            loadEndpoint(
                _.get(getState(), 'env'), POST_ORGANIZATION), serialize(org)
            ))
            .then(result => dispatch({ type: ADD_ORG_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: ADD_ORG_REJECTED, payload: err }));
    };
};

export const getOrganizationsById = ids => {
    // if (!ids) return;
    return (dispatch, getState) => {
        const url = `${loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATION_BY_ID)}/${ids.join('&')}`;
        HttpClient(getState()).then(client => client.get(url))
            .then(result => dispatch({ type: GET_ORG_ID_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORG_ID_REJECTED, payload: err }));
    };
};
