import {
    SAVE_USER_DATA,
    GET_ALL_USER_DATA,
    GET_USER_DATA_BY_ID,
    UPDATE_USER_DATA,
    CHECK_USER_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_USER,
    GET_ACTIVE_USERS
} from 'store/constant/authentication/UserConstant';

export const saveUserData = (data) => {
    console.log('saveUserData  Data action s called', data);
    return {
        type: SAVE_USER_DATA,
        data
    };
};

export const getAllUserDetails = () => {
    console.log('get getAllUserDetails Data action s called');
    return {
        type: GET_ALL_USER_DATA
    };
};

export const getUserDataById = (id) => {
    console.log('getUserDataById  called', id);
    return {
        type: GET_USER_DATA_BY_ID,
        data: { id }
    };
};

export const updateUserData = (data) => {
    console.log('updateUserData  called', data);
    return {
        type: UPDATE_USER_DATA,
        data: data
    };
};

export const checkDuplicateUserCode = (data) => {
    console.log('checkDuplicateUserCode  called', data);
    return {
        type: CHECK_USER_DUPLICATE,
        data: data
    };
};

export const getLatestModifiedUserDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_USER
    };
};

export const getActiveUsers = () => {
    return {
        type: GET_ACTIVE_USERS
    };
};
