import _ from 'lodash';

import { HttpClient, loadEndpoint, serialize } from '../../lib/common';
import {
    CREATE_ORG_REJECTED, CREATE_ORG_RESOLVED, CREATE_ORG_PENDING,
    GET_ORGS_BY_ID_REJECTED, GET_ORGS_BY_ID_RESOLVED, GET_ORGS_BY_ID_PENDING,
    GET_ORGS_REJECTED, GET_ORGS_RESOLVED, GET_ORGS_PENDING
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_ORGANIZATIONS, POST_ORGANIZATION, GET_ORGANIZATION_BY_ID } = serviceRoutes;

export const getOrganizations = organizationIds => {
    return (dispatch, getState) => {
        dispatch({ type: GET_ORGS_PENDING });

        HttpClient(getState()).then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATIONS)))
            .then(result => dispatch({ type: GET_ORGS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORGS_REJECTED, payload: err }));
    };
};

export const addOrganization = (org) => {
    return (dispatch, getState) => {
        dispatch({ type: CREATE_ORG_PENDING });

        HttpClient(getState()).then(client => client.post(
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
        const url = `${loadEndpoint(_.get(getState(), 'env'), GET_ORGANIZATION_BY_ID)}/${ids.join('&')}`;

        HttpClient(getState()).then(client => client.get(url))
            .then(result => dispatch({ type: GET_ORGS_BY_ID_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_ORGS_BY_ID_REJECTED, payload: err }));
    };
};
