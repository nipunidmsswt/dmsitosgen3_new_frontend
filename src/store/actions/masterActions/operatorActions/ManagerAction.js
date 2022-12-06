import {
    CHECK_MANAGER_CODE_DUPLICATE,
    GET_ALL_ACTIVE_MANAGER_DATA,
    GET_ALL_MANAGER_DATA,
    GET_MANAGER_DETAILS_BY_CODE,
    GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    SAVE_MANAGER_DATA,
    UPDATE_MANAGER_DATA
} from '../../../constant/master/ManagerConstant';

export const saveManagerData = (data) => {
    console.log('saveManagerData action s called', data);
    return {
        type: SAVE_MANAGER_DATA,
        data
    };
};

export const getAllManagerData = () => {
    return {
        type: GET_ALL_MANAGER_DATA
    };
};

export const getManagerDetailsByCode = (id) => {
    console.log('action:' + id);
    return {
        type: GET_MANAGER_DETAILS_BY_CODE,
        data: { id }
    };
};

export const updateManagerData = (data) => {
    return {
        type: UPDATE_MANAGER_DATA,
        data
    };
};

export const checkDuplicateManagersCode = (data) => {
    return {
        type: CHECK_MANAGER_CODE_DUPLICATE,
        data: data
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_MANAGER_LAST_MODIFIED_DATE_TIME
    };
};

export const getAllActiveManagerData = () => {
    return {
        type: GET_ALL_ACTIVE_MANAGER_DATA
    };
};
