import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';
import {
    ADD_FAILED_OWNER_DATA,
    ADD_SUCCESS_OWNER_DATA,
    FAILED_GET_OWNER_DATA_BY_ID,
    FAILED_OWNER_LAST_MODIFIED_DATE,
    FAILED_OWNER_LIST_DATA,
    OWNER_CODE_DUPLICATE,
    SUCCESS_GET_OWNER_DATA_BY_ID,
    SUCCESS_OWNER_LAST_MODIFIED_DATE,
    SUCCESS_OWNER_LIST_DATA,
    UPDATE_FAILED_OWNER_DATA,
    UPDATE_SUCCESS_OWNER_DATA
} from '../../constant/master/OwnerConstant';

export function* saveOwner(action) {
    action.data.path = `${process.env.REACT_APP_TOUR_URL}/owner/`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_OWNER_DATA, data: responseData.data });
    } catch (e) {
        console.log('e:' + e);
        yield put({ type: ADD_FAILED_OWNER_DATA, data: responseData.data });
    }
}

export function* getAllOwnerSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/owner/`);
        yield put({ type: SUCCESS_OWNER_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_OWNER_LIST_DATA, data: responseData.data });
    }
}

export function* getOwnerByIdSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_TOUR_URL}/owner/${action.data.id}`);
        console.log('response data:' + responseData);
        yield put({ type: SUCCESS_GET_OWNER_DATA_BY_ID, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_OWNER_DATA_BY_ID, data: responseData.data });
    }
}

export function* updateOwnerSaga(action) {
    action.data.path = `${process.env.REACT_APP_TOUR_URL}/owner/${action.data.code}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);

        yield put({ type: UPDATE_SUCCESS_OWNER_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_OWNER_DATA, data: responseData.data });
    }
}

export function* checkOwnerLatestModifiedDateSaga() {
    console.log('latest date');
    let responseData = [];
    // action.data.path = `/product`;
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/owner/lastModifiedTime`);
        yield put({ type: SUCCESS_OWNER_LAST_MODIFIED_DATE, data: responseData.data });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_OWNER_LAST_MODIFIED_DATE, data: '' });
    }
}

export function* checkDupicateOwnerCodeSaga(action) {
    console.log('checkDupicateCodeSaga:' + action);
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_TOUR_URL}/owner/codeDuplicate/${action.data.code}`);
        console.log('response data:' + responseData);
        yield put({ type: OWNER_CODE_DUPLICATE, data: responseData.data.errorMessages });
    } catch (e) {
        console.log(responseData);
        yield put({ type: OWNER_CODE_DUPLICATE, data: responseData.data.errorMessages });
    }
}
