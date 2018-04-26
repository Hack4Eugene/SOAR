import axios from 'axios';
import _ from 'lodash';
import serviceConfig from '../config/local';

export const request = opts => axios(opts);

export const loadEndpoint = path => _.get(serviceConfig.serviceRoutes, path, null);