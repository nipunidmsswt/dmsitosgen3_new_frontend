import { put, call } from 'redux-saga/effects';
import {
    ADD_SUCCESS_USER_DATA,
    ADD_FAILED_USER_DATA,
    UPDATE_SUCCESS_USER_DATA,
    UPDATE_FAILED_USER_DATA,
    SUCCESS_USER_LIST_DATA,
    FAILED_USER_LIST_DATA,
    SUCCESS_GET_USER_DATA_BY_ID,
    FAILED_GET_USER_DATA_BY_ID,
    CHECK_USER_DUPLICATE,
    SUCCESS_LAST_MODIFIED_DATE_USER,
    FAILED_LAST_MODIFIED_DATE_USER,
    SUCCESS_GET_ACTIVE_USERS,
    FAILED_GET_ACTIVE_USERS,
    SUCCESS_GET_ALL_USER_ROLES,
    FAILED_GET_GET_ALL_USER_ROLES,
    FAILED_GET_ALL_USER_ROLES,
    SUCCESS_USER_LOGIN_DATA,
    FAILED_USER_LOGIN_DATA,
    SUCCESS_FORGOT_PASSWORD_CREDENTIALS,
    FAILED_FORGOT_PASSWORD_CREDENTIALS,
    SUCCESS_RESET_PASSWORD_CREDENTIALS,
    FAILED_RESET_PASSWORD_CREDENTIALS,
    SUCCESS_GET_PROFILE_DATA_BY_ID,
    FAILED_GET_PROFILE_DATA_BY_ID
} from 'store/constant/authentication/UserConstant';
import { create, getById, updateWithUpload, get, createWithUpload } from '../../../apis/Apis';

//User creation saga

export function* saveUserSaga(action) {
    console.log('yaaa');
    action.data.path = `${process.env.REACT_APP_USER_MANAGEMENT_URL}/register`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_USER_DATA, data: responseData.data });
    } catch (e) {
        console.log('e:' + e);
        yield put({ type: ADD_FAILED_USER_DATA, data: responseData.data });
    }
}

export function* getUserByIdSaga(action) {
    console.log('getTaxByIdSaga tax saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_GATEWAY_SERVICE_URL}/userProfile/${action.data.id}`);
        console.log(responseData);
        yield put({ type: SUCCESS_GET_USER_DATA_BY_ID, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_USER_DATA_BY_ID, data: responseData.data });
    }
}

export function* getProfileDataByIdSaga(action) {
    console.log('getProfileDataByIdSaga  saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_GATEWAY_SERVICE_URL}/userProfile/${action.data.id}`);
        console.log(responseData);
        yield put({ type: SUCCESS_GET_PROFILE_DATA_BY_ID, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_PROFILE_DATA_BY_ID, data: responseData.data });
    }
}

export function* updateUserSaga(action) {
    console.log('updateTaxSaga tax saga');
    console.log(action);
    action.data.path = `${process.env.REACT_APP_USER_MANAGEMENT_URL}/User/`;
    let responseData = [];
    try {
        responseData = yield call(updateWithUpload, action.data);
        console.log(responseData);
        yield put({ type: UPDATE_SUCCESS_USER_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_USER_DATA, data: responseData.data });
    }
}

export function* getAllUserSaga() {
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_USER_MANAGEMENT_URL + '/users');
        console.log(responseData.data.payload);
        yield put({ type: SUCCESS_USER_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_USER_LIST_DATA, data: responseData.data });
    }
}

export function* checkDupicateUserSaga(action) {
    console.log('checkDupicateTaxCodeSaga tax saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_USER_MANAGEMENT_URL}/taxCodeCheck/${action.data.taxCode}`);
        console.log(responseData);
        yield put({ type: CHECK_USER_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: CHECK_USER_DUPLICATE, data: responseData });
    }
}

export function* checkLatestUserModifiedDateSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_USER_MANAGEMENT_URL}/lastModifiedTime`);
        console.log('response data last:' + responseData);
        yield put({ type: SUCCESS_LAST_MODIFIED_DATE_USER, data: responseData.data });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_LAST_MODIFIED_DATE_USER, data: '' });
    }
}

export function* getAllActiveUsers() {
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_USER_MANAGEMENT_URL + '/User/activeUserDetails');
        console.log(responseData.data.payload);
        yield put({ type: SUCCESS_GET_ACTIVE_USERS, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_ACTIVE_USERS, data: responseData.data });
    }
}

export function* getAllRolesSaga() {
    console.log('tee hkere');
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_USER_MANAGEMENT_URL + '/role/roles');
        console.log(responseData);
        yield put({ type: SUCCESS_GET_ALL_USER_ROLES, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_ALL_USER_ROLES, data: responseData.data });
    }
}
//user login

export function* userLoginSaga(action) {
    action.data.path = `${process.env.REACT_APP_USER_MANAGEMENT_URL}/authenticate`;
    let responseData = [];

    try {
        responseData = yield call(create, action.data);
        console.log(responseData);
        yield put({
            type: SUCCESS_USER_LOGIN_DATA,
            data: responseData.data
        });
    } catch (e) {
        console.log(e);
        console.log(e.response.data.errorMessages);
        yield put({
            type: FAILED_USER_LOGIN_DATA,
            data: e.response.data.errorMessages
        });
    }
}

//forgot password

export function* forgotPasswordSaga(action) {
    action.data.path = `${process.env.REACT_APP_USER_MANAGEMENT_URL}/user/resetMail/${action.data.username}`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);

        yield put({
            type: SUCCESS_FORGOT_PASSWORD_CREDENTIALS,
            data: responseData.data
        });
    } catch (e) {
        yield put({
            type: FAILED_FORGOT_PASSWORD_CREDENTIALS,
            data: e.response.data.errorMessages
        });
    }
}

//reset password

export function* resetPasswordSaga(action) {
    action.data.path = `${process.env.REACT_APP_USER_MANAGEMENT_URL}/user/resetpwd`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);

        yield put({
            type: SUCCESS_RESET_PASSWORD_CREDENTIALS,
            data: responseData.data
        });
    } catch (e) {
        yield put({
            type: FAILED_RESET_PASSWORD_CREDENTIALS,
            data: e.response.data.errorMessages
        });
    }
}
