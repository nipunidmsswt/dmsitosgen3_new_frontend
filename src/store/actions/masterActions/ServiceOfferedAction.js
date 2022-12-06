import {
    SAVE_SERVICEOFFERED_DATA,
    GET_ALL_SERVICEOFFERED_DATA,
    GET_SERVICEOFFERED_DATA_BY_ID,
    UPDATE_SERVICEOFFERED_DATA,
    GET_SERVICEOFFERED_LAST_MODIFIED_DATE_TIME,
    CHECK_SERVICEOFFERED_CODE_DUPLICATE
} from '../../constant/master/ServiceOfferedConstant';

export const saveServiceOfferedData = (data) => {
    return {
        type: SAVE_SERVICEOFFERED_DATA,
        data
    };
};

export const getAllServiceOfferedData = () => {
    return {
        type: GET_ALL_SERVICEOFFERED_DATA
    };
};

export const getServiceOfferedDataById = (id) => {
    return {
        type: GET_SERVICEOFFERED_DATA_BY_ID,
        data: { id }
    };
};

export const updateServiceOfferedData = (data) => {
    return {
        type: UPDATE_SERVICEOFFERED_DATA,
        data
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_SERVICEOFFERED_LAST_MODIFIED_DATE_TIME
    };
};

export const checkDuplicateServiceOfferedCode = (code) => {
    console.log('serviceOffered code:' + code);
    return {
        type: CHECK_SERVICEOFFERED_CODE_DUPLICATE,
        data: { code }
    };
};
