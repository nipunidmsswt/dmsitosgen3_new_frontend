import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';
import {
    ADD_FAILED_MANAGER_DATA,
    ADD_SUCCESS_MANAGER_DATA,
    FAILED_GET_ALL_ACTIVE_MANAGER_DATA,
    FAILED_GET_ALL_MANAGER_DATA,
    FAILED_GET_MANAGER_DETAILS_BY_CODE,
    FAILED_GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    MANAGER_CODE_DUPLICATE,
    SUCCESS_GET_ALL_ACTIVE_MANAGER_DATA,
    SUCCESS_GET_ALL_MANAGER_DATA,
    SUCCESS_GET_MANAGER_DETAILS_BY_CODE,
    SUCCESS_GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    UPDATE_FAILED_MANAGER_DATA,
    UPDATE_SUCCESS_MANAGER_DATA
} from '../../constant/master/ManagerConstant';

export function* saveManagerDataHandler(action) {
    action.data.path = `${process.env.REACT_APP_OPERATOR_URL}/manager/`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_MANAGER_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: ADD_FAILED_MANAGER_DATA, data: responseData.data });
    }
}

export function* getAllManagerDataSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_OPERATOR_URL}/manager/`);
        yield put({ type: SUCCESS_GET_ALL_MANAGER_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_MANAGER_DATA, data: responseData.data });
    }
}

export function* getManagerDetailsByCodeSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_OPERATOR_URL}/manager/${action.data.id}`);
        console.log('response data:' + responseData);
        yield put({ type: SUCCESS_GET_MANAGER_DETAILS_BY_CODE, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_MANAGER_DETAILS_BY_CODE, data: responseData.data });
    }
}

export function* updateManagerDataSaga(action) {
    action.data.path = `${process.env.REACT_APP_OPERATOR_URL}/manager/${action.data.code}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);

        yield put({ type: UPDATE_SUCCESS_MANAGER_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_MANAGER_DATA, data: responseData.data });
    }
}

export function* checkManagerDupicateCodeSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_OPERATOR_URL}/manager/codeDuplicate/${action.data}`);
        console.log(responseData);
        yield put({ type: MANAGER_CODE_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: MANAGER_CODE_DUPLICATE, data: responseData });
    }
}

export function* getManagerLatestModifiedDateSaga() {
    console.log('latest date');
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_OPERATOR_URL}/manager/lastModifiedTime`);
        yield put({
            type: SUCCESS_GET_MANAGER_LAST_MODIFIED_DATE_TIME,
            data: responseData.data
        });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_GET_MANAGER_LAST_MODIFIED_DATE_TIME, data: '' });
    }
}

export function* getAllActiveManagerDataSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_OPERATOR_URL}/manager/active`);
        yield put({ type: SUCCESS_GET_ALL_ACTIVE_MANAGER_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_ACTIVE_MANAGER_DATA, data: responseData.data });
    }
}
