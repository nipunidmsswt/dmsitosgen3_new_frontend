import {
    ADD_FAILED_SERVICEOFFERED_DATA,
    ADD_SUCCESS_SERVICEOFFERED_DATA,
    FAILED_GET_SERVICEOFFERED_DATA_BY_ID,
    FAILED_SERVICEOFFERED_LAST_MODIFIED_DATE,
    FAILED_SERVICEOFFERED_LIST_DATA,
    SERVICEOFFERED_CODE_DUPLICATE,
    SUCCESS_GET_SERVICEOFFERED_DATA_BY_ID,
    SUCCESS_SERVICEOFFERED_LAST_MODIFIED_DATE,
    SUCCESS_SERVICEOFFERED_LIST_DATA,
    UPDATE_FAILED_SERVICEOFFERED_DATA,
    UPDATE_SUCCESS_SERVICEOFFERED_DATA
} from '../../constant/master/ServiceOfferedConstant';
import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';

export function* saveServiceOffered(action) {
    action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/hotelServiceOffered/`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_SERVICEOFFERED_DATA, data: responseData.data });
    } catch (e) {
        console.log('e:' + e);
        yield put({ type: ADD_FAILED_SERVICEOFFERED_DATA, data: responseData.data });
    }
}

export function* getAllServiceOfferedSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_ACCOMODATION_URL}/hotelServiceOffered/`);
        yield put({ type: SUCCESS_SERVICEOFFERED_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_SERVICEOFFERED_LIST_DATA, data: responseData.data });
    }
}

export function* getServiceOfferedByIdSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_ACCOMODATION_URL}/hotelServiceOffered/${action.data.id}`);
        console.log('response data:' + responseData);
        yield put({ type: SUCCESS_GET_SERVICEOFFERED_DATA_BY_ID, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_SERVICEOFFERED_DATA_BY_ID, data: responseData.data });
    }
}

export function* updateServiceOfferedSaga(action) {
    action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/hotelServiceOffered/${action.data.code}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);

        yield put({ type: UPDATE_SUCCESS_SERVICEOFFERED_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_SERVICEOFFERED_DATA, data: responseData.data });
    }
}

export function* checkServiceOfferedLatestModifiedDateSaga() {
    console.log('latest date');
    let responseData = [];
    // action.data.path = `/product`;
    try {
        responseData = yield call(get, `${process.env.REACT_APP_ACCOMODATION_URL}/hotelServiceOffered/lastModifiedTime`);
        yield put({ type: SUCCESS_SERVICEOFFERED_LAST_MODIFIED_DATE, data: responseData.data });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_SERVICEOFFERED_LAST_MODIFIED_DATE, data: '' });
    }
}

export function* checkDupicateServiceOfferedCodeSaga(action) {
    console.log('checkDupicateProductCodeSaga:' + action);
    let responseData = [];
    try {
        responseData = yield call(
            getById,
            `${process.env.REACT_APP_ACCOMODATION_URL}/hotelServiceOffered/codeDuplicate/${action.data.code}`
        );
        console.log('response data:' + responseData);
        yield put({ type: SERVICEOFFERED_CODE_DUPLICATE, data: responseData.data.errorMessages });
    } catch (e) {
        console.log(responseData);
        yield put({ type: SERVICEOFFERED_CODE_DUPLICATE, data: responseData.data.errorMessages });
    }
}
