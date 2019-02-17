import _ from 'lodash';

import { HttpClient, loadEndpoint } from '../../lib/common';
import { stripAxiosRequestFromError } from '../../lib/util';
import {
    DELETE_PROJECT_REJECTED,
    DELETE_PROJECT_RESOLVED, GET_PROJECT_BY_ID_PENDING, GET_PROJECT_BY_ID_REJECTED, GET_PROJECT_BY_ID_RESOLVED,
    GET_PROJECTS_BY_ORG_REJECTED,
    GET_PROJECTS_BY_ORG_RESOLVED,
    GET_PROJECTS_REJECTED, GET_PROJECTS_RESOLVED,
    UPDATE_PROJECT_RESOLVED, UPDATE_PROJECT_REJECTED, UPDATE_PROJECT_PENDING,
    CREATE_PROJECT_RESOLVED, CREATE_PROJECT_REJECTED, CREATE_PROJECT_PENDING
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_PROJECTS_BY_ORGANIZATION, GET_PROJECTS, DELETE_PROJECT, GET_PROJECT_BY_ID, POST_PROJECT, UPDATE_PROJECT } = serviceRoutes;

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
        .catch(err => dispatch({ type: GET_PROJECT_BY_ID_REJECTED, payload: err }));
};

export const updateProject = (projectID, updates) => (dispatch, getState) => {
    const state = getState();
    const env = _.get(state, 'env', 'local');

    dispatch({ type: UPDATE_PROJECT_PENDING });

    HttpClient(state)
        .then(client => client.post(`${loadEndpoint(env, UPDATE_PROJECT)}/${projectID}`, updates))
        .then(result => dispatch({ type: UPDATE_PROJECT_RESOLVED, payload: result }))
        .then(() => dispatch(getProjectById(projectID)))
        .catch(err => dispatch({ type: UPDATE_PROJECT_REJECTED, payload: stripAxiosRequestFromError(err) }));
};

export const createProject = projectData => (dispatch, getState) => {
    const state = getState();
    const env = _.get(state, 'env', 'local');

    dispatch({ type: CREATE_PROJECT_PENDING });

    HttpClient(state)
        .then(client => client.post(`${loadEndpoint(env, POST_PROJECT)}`, projectData))
        .then(result => dispatch({ type: CREATE_PROJECT_RESOLVED, payload: result }))
        .catch(err => {
            console.log('err', err)
            dispatch({ type: CREATE_PROJECT_REJECTED, payload: stripAxiosRequestFromError(err) })
        });
};
