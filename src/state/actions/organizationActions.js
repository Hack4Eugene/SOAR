import _ from 'lodash';

import { HttpClient, loadEndpoint, serialize } from '../../lib/common';
import { stripAxiosRequestFromError } from '../../lib/util';

import {
    CREATE_ORG_REJECTED, CREATE_ORG_RESOLVED, CREATE_ORG_PENDING,
    GET_ORGS_BY_ID_REJECTED, GET_ORGS_BY_ID_RESOLVED, GET_ORGS_BY_ID_PENDING,
    GET_ORG_BY_ID_REJECTED, GET_ORG_BY_ID_RESOLVED, GET_ORG_BY_ID_PENDING,
    GET_ORGS_REJECTED, GET_ORGS_RESOLVED, GET_ORGS_PENDING,
    UPDATE_ORG_REJECTED, UPDATE_ORG_RESOLVED, UPDATE_ORG_PENDING,
    GET_ORG_PROJECTS_BY_ID_PENDING, GET_ORG_PROJECTS_BY_ID_RESOLVED, GET_ORG_PROJECTS_BY_ID_REJECTED
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_ORGANIZATIONS, POST_ORGANIZATION, GET_ORGANIZATIONS_BY_ID, GET_ORGANIZATION_BY_ID, UPDATE_ORGANIZATION, GET_ORG_PROJECTS_BY_ID } = serviceRoutes;

export const getOrganizations = organizationIds => {
    return (dispatch, getState) => {
        dispatch({ type: GET_ORGS_PENDING });

        HttpClient(getState())
            .then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATIONS)))
            .then(result => dispatch({ type: GET_ORGS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORGS_REJECTED, payload: err }));
    };
};

export const addOrganization = (org) => {
    return (dispatch, getState) => {
        dispatch({ type: CREATE_ORG_PENDING });

        HttpClient(getState())
            .then(client => client.post(
            loadEndpoint(
                _.get(getState(), 'env'), POST_ORGANIZATION), serialize(org)
            ))
            .then(result => dispatch({ type: CREATE_ORG_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: CREATE_ORG_REJECTED, payload: err }));
    };
};

export const getOrganizationsById = ids => {
    return (dispatch, getState) => {
        dispatch({ type: GET_ORGS_BY_ID_PENDING });
        const url = `${loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATIONS_BY_ID)}/${ids.join('&')}`;

        HttpClient(getState())
            .then(client => client.get(url))
            .then(result => dispatch({ type: GET_ORGS_BY_ID_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORGS_BY_ID_REJECTED, payload: err }));
    };
};

export const getOrganizationById = id => {
    return (dispatch, getState) => {
        dispatch({ type: GET_ORG_BY_ID_PENDING });
        const url = `${loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATION_BY_ID)}/${id}`;

        HttpClient(getState())
            .then(client => client.get(url))
            .then(result => dispatch({ type: GET_ORG_BY_ID_RESOLVED, payload: result }))
            .catch(err => {
                console.log('err', err)
                dispatch({ type: GET_ORG_BY_ID_REJECTED, payload: err })
            });
    };
};

export const updateOrganization = (id, updates) => {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_ORG_PENDING });
        const url = `${loadEndpoint(_.get(getState(), 'env'), UPDATE_ORGANIZATION)}/${id}`;

        HttpClient(getState())
            .then(client => client.post(url, updates))
            .then(result => dispatch({ type: UPDATE_ORG_RESOLVED, payload: result }))
            .then(() => dispatch(getOrganizationById(id)))
            .catch(err => dispatch({ type: UPDATE_ORG_REJECTED, payload: err }));
    };
};

export const getOrgProjectsById = projectIds => (dispatch, getState) => {
    const state = getState();
    const env = _.get(state, 'env', 'local');

    HttpClient(state)
        .then(client => client.get(`${loadEndpoint(env, GET_ORG_PROJECTS_BY_ID)}/${projectIds}`))
        .then(result => dispatch({ type: GET_ORG_PROJECTS_BY_ID_RESOLVED, payload: result }))
        .catch(err => dispatch({ type: GET_ORG_PROJECTS_BY_ID_REJECTED, payload: err }));
};