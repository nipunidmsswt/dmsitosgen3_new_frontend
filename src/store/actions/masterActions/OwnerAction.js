import {
    CHECK_OWNER_CODE_DUPLICATE,
    GET_ALL_OWNER_DATA,
    GET_OWNER_DATA_BY_ID,
    GET_OWNER_LAST_MODIFIED_DATE_TIME,
    SAVE_OWNER_DATA,
    UPDATE_OWNER_DATA
} from '../../constant/master/OwnerConstant';

export const saveOwnerData = (data) => {
    return {
        type: SAVE_OWNER_DATA,
        data
    };
};

export const getAllOwnerData = () => {
    return {
        type: GET_ALL_OWNER_DATA
    };
};

export const getOwnerDataById = (id) => {
    return {
        type: GET_OWNER_DATA_BY_ID,
        data: { id }
    };
};

export const updateOwnerData = (data) => {
    return {
        type: UPDATE_OWNER_DATA,
        data
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_OWNER_LAST_MODIFIED_DATE_TIME
    };
};

export const checkDuplicateOwnerCode = (code) => {
    console.log('owner code:' + code);
    return {
        type: CHECK_OWNER_CODE_DUPLICATE,
        data: { code }
    };
};
