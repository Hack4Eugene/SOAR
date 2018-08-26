import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import eventReducer from './eventReducer';
import organizationReducer from './organizationReducer';
import projectReducer from './projectsReducer';
import userReducer from './userReducer';

const externalState = {
    env: (state = {}) => state
};

const reducer = combineReducers({
    ...externalState,
    authentication: authenticationReducer,
    user: userReducer,
    events: eventReducer,
    projects: projectReducer,
    organizations: organizationReducer
});

export default reducer;
