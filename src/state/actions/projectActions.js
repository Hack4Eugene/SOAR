import _ from 'lodash';

import { HttpClient, loadEndpoint } from '../../lib/common';
import {
    DELETE_PROJECT_REJECTED,
    DELETE_PROJECT_RESOLVED, GET_PROJECT_BY_ID_PENDING, GET_PROJECT_BY_ID_REJECTED, GET_PROJECT_BY_ID_RESOLVED,
    GET_PROJECTS_BY_ORG_REJECTED,
    GET_PROJECTS_BY_ORG_RESOLVED,
    GET_PROJECTS_REJECTED, GET_PROJECTS_RESOLVED
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_PROJECTS_BY_ORGANIZATION, GET_PROJECTS, DELETE_PROJECT, GET_PROJECT_BY_ID } = serviceRoutes;

export const getProjectsByOrganization = projectID => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(
            `${loadEndpoint(
                _.get(getState(), 'env'), GET_PROJECTS_BY_ORGANIZATION)}/${projectID}`
            ))
            .then(result => dispatch({ type: GET_PROJECTS_BY_ORG_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_PROJECTS_BY_ORG_REJECTED, payload: err }));
    };
};

export const getProjects = () => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_PROJECTS)))
            .then(result => dispatch({ type: GET_PROJECTS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_PROJECTS_REJECTED, payload: err }));
    };
};

export const deleteProject = projectID => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.delete(
            `${loadEndpoint(_.get(getState(), 'env'), DELETE_PROJECT)}/${projectID}`
            ))
            .then(result => dispatch({ type: DELETE_PROJECT_RESOLVED }))
            .then(() => dispatch(getProjects()))
            .catch(err => dispatch({ type: DELETE_PROJECT_REJECTED, payload: err }));
    };
};

export const getProjectById = projectID => (dispatch, getState) => {
    const state = getState();
    const env = _.get(state, 'env', 'local');

    dispatch({ type: GET_PROJECT_BY_ID_PENDING });

    HttpClient(state)
        .then(client => client.get(`${loadEndpoint(env, GET_PROJECT_BY_ID)}/${projectID}`))
        .then(result => dispatch({ type: GET_PROJECT_BY_ID_RESOLVED, payload: result }))
        .catch(err => dispatch({ type: GET_PROJECT_BY_ID_REJECTED, error: err }));
};
