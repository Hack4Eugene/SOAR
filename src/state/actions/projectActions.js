import _ from 'lodash';

import { HttpClient, loadEndpoint } from '../../lib/common';
import {
    DELETE_PROJECT_REJECTED,
    DELETE_PROJECT_RESOLVED,
    GET_PROJECTS_BY_ORG_REJECTED,
    GET_PROJECTS_BY_ORG_RESOLVED,
    GET_PROJECTS_REJECTED, GET_PROJECTS_RESOLVED
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_PROJECTS_BY_ORGANIZATION, GET_PROJECTS, DELETE_PROJECT } = serviceRoutes;

export const getProjectsByOrganization = () => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.get(
            `${loadEndpoint(
                _.get(getState(), 'env'), GET_PROJECTS_BY_ORGANIZATION)}/5ac9877976448030b88ac636`
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
