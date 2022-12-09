import {
    CHECK_CODE_DUPLICATE,
    CHECK_CODE_TYPE_DUPLICATE,
    GET_ALL_CLUSTER_DATA,
    GET_ALL_CODE_AND_NAME_DATA,
    GET_ALL_OPERATOR_DATA,
    GET_CODE_LAST_MODIFIED_DATE_TIME,
    GET_CODE_NAME_DATA_BY_CODE,
    SAVE_CODE_AND_NAME_DATA,
    UPDATE_CODE_AND_NAME_DATA
} from '../../constant/master/CodeAndNameConstant';

export const saveCodeAndNameData = (data) => {
    return {
        type: SAVE_CODE_AND_NAME_DATA,
        data
    };
};

export const getAllCodeAndNameDetails = () => {
    return {
        type: GET_ALL_CODE_AND_NAME_DATA
    };
};

export const getCodeAndNameDataByCode = (id) => {
    console.log('action:' + id);
    return {
        type: GET_CODE_NAME_DATA_BY_CODE,
        data: { id }
    };
};

export const updateCodeAndNameData = (data) => {
    return {
        type: UPDATE_CODE_AND_NAME_DATA,
        data
    };
};

export const checkDuplicateCodeTypeForCodeAndName = (data) => {
    return {
        type: CHECK_CODE_TYPE_DUPLICATE,
        data: data
    };
};

export const checkDuplicateCodeForCodeAndName = (data) => {
    return {
        type: CHECK_CODE_DUPLICATE,
        data: data
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_CODE_LAST_MODIFIED_DATE_TIME
    };
};

export const getAllClusterData = () => {
    return {
        type: GET_ALL_CLUSTER_DATA
    };
};

export const getAllActiveOperatorData = () => {
    return {
        type: GET_ALL_OPERATOR_DATA
    };
};


