import { ERROR, NOT_STARTED, SUCCESS, LOADING } from '../statusTypes';
import {
    CREATE_ORG_PENDING,
    CREATE_ORG_RESOLVED,
    CREATE_ORG_REJECTED,
    UPDATE_ORG_PENDING,
    UPDATE_ORG_RESOLVED,
    UPDATE_ORG_REJECTED,
    GET_ORGS_PENDING,
    GET_ORGS_REJECTED,
    GET_ORGS_RESOLVED,
    GET_ORGS_BY_ID_PENDING,
    GET_ORGS_BY_ID_RESOLVED,
    GET_ORGS_BY_ID_REJECTED,
    GET_ORG_BY_ID_PENDING,
    GET_ORG_BY_ID_RESOLVED,
    GET_ORG_BY_ID_REJECTED,
    GET_ORG_PROJECTS_BY_ID_PENDING,
    GET_ORG_PROJECTS_BY_ID_RESOLVED,
    GET_ORG_PROJECTS_BY_ID_REJECTED
} from '../types';

const initialState = {
    data: [],
    status: NOT_STARTED,
    selectedOrg: {
        data: {
            projects: {
                status: NOT_STARTED
            }
        },
        status: {
            get: NOT_STARTED,
            create: NOT_STARTED,
            update: NOT_STARTED
        }
    }
};

const organizationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ORG_RESOLVED: {
            return {
                ...state,
                selectedOrg: {
                    data: payload.data,
                    status: { create: SUCCESS }
                }
            };
        }

        case CREATE_ORG_REJECTED: {
            return {
                ...state,
                selectedOrg: {
                    error: payload,
                    status: { create: ERROR }
                }
            };
        }

        case CREATE_ORG_PENDING: {
            return {
                ...state,
                selectedOrg: {
                    status: { create: LOADING }
                }
            };
        }

        case UPDATE_ORG_RESOLVED: {
            return {
                ...state,
                selectedOrg: {
                    data: payload.data,
                    status: { update: SUCCESS }
                }
            };
        }

        case UPDATE_ORG_REJECTED: {
            return {
                ...state,
                selectedOrg: {
                    error: payload,
                    status: { update: ERROR }
                }
            };
        }

        case UPDATE_ORG_PENDING: {
            return {
                ...state,
                selectedOrg: {
                    status: { update: LOADING }
                }
            };
        }

        case GET_ORGS_RESOLVED: {
            return { 
                ...state, 
                data: payload.data, 
                status: SUCCESS 
            };
        }

        case GET_ORGS_REJECTED: {
            return { 
                ...state, 
                error: payload, 
                status: ERROR 
            };
        }

        case GET_ORGS_PENDING: {
            return { 
                ...state, 
                status: LOADING 
            };
        }

        case GET_ORGS_BY_ID_RESOLVED: {
            return { 
                ...state, 
                organizationsById: payload.data, 
                status: SUCCESS 
            };
        }

        case GET_ORGS_BY_ID_REJECTED: {
            return { 
                ...state, 
                error: payload, 
                status: ERROR 
            };
        }

        case GET_ORGS_BY_ID_PENDING: {
            return { 
                ...state, 
                status: LOADING 
            };
        }

        case GET_ORG_BY_ID_RESOLVED: {
            const orgProjects = {
                data: payload.data.projects,
                status: NOT_STARTED
            }

            payload.data.projects = orgProjects;

            return { 
                ...state, 
                selectedOrg: {
                    data: payload.data,
                    status: { 
                        ...state.selectedOrg.status,
                        get: SUCCESS 
                    }
                }
            };
        }

        case GET_ORG_BY_ID_REJECTED: {
            return { 
                ...state, 
                selectedOrg: {
                    error: payload,
                    status: { 
                        ...state.selectedOrg.status,
                        get: ERROR 
                    }
                }
            };
        }

        case GET_ORG_BY_ID_PENDING: {
            return { 
                ...state, 
                selectedOrg: {
                    status: { 
                        ...state.selectedOrg.status,
                        get: LOADING 
                    }
                } 
            };
        }

        case GET_ORG_PROJECTS_BY_ID_PENDING: {
            // const orgProjects = { status: LOADING }
            // payload.data[0].projects = orgProjects;

            // return {
            //     ...state,
            //     selectedOrg: {
            //         data: payload.data
            //     } 
            // }
        }

        case GET_ORG_PROJECTS_BY_ID_RESOLVED: {
            const orgProjects = { 
                data: payload.data,
                status: SUCCESS 
            }

            // payload.data[0].projects = orgProjects;

            return {
                ...state,
                selectedOrg: {
                    data: {
                        ...state.selectedOrg.data,
                        projects: orgProjects
                    },
                    status: {
                        ...state.selectedOrg.status
                    }
                } 
            }
        }

        case GET_ORG_PROJECTS_BY_ID_REJECTED: {
            const orgProjects = { 
                error: payload,
                status: ERROR 
            }

            // payload.data[0].projects = orgProjects;

            // return {
            //     ...state,
            //     selectedOrg: {
            //         data: payload.data
            //     } 
            // }
        }

        default: return state;
    }
};

export default organizationReducer;
