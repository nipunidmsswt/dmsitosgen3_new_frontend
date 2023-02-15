import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';

import {
    ADD_FAILED_ACTIVITY_SUPPLIMENT_DATA,
    ADD_SUCCESS_ACTIVITY_SUPPLIMENT_DATA,
    FAILED_GET_ALL_ACTIVE_ACTIVITY_SUPPLIMENT_DATA,
    FAILED_GET_ALL_ACTIVITY_SUPPLIMENT_DATA,
    FAILED_GET_ACTIVITY_SUPPLIMENT_DETAILS_BY_CODE,
    FAILED_GET_ACTIVITY_SUPPLIMENT_LAST_MODIFIED_DATE_TIME,
    ACTIVITY_SUPPLIMENT_CODE_DUPLICATE,
    SUCCESS_GET_ALL_ACTIVE_ACTIVITY_SUPPLIMENT_DATA,
    SUCCESS_GET_ALL_ACTIVITY_SUPPLIMENT_DATA,
    SUCCESS_GET_ACTIVITY_SUPPLIMENT_DETAILS_BY_CODE,
    SUCCESS_GET_ACTIVITY_SUPPLIMENT_LAST_MODIFIED_DATE_TIME,
    UPDATE_FAILED_ACTIVITY_SUPPLIMENT_DATA,
    UPDATE_SUCCESS_ACTIVITY_SUPPLIMENT_DATA
} from '../../constant/master/Activity_SupplimentConstant';

export function* getAllActivity_SupplimentDataSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/activities`);
        console.log(responseData);
        yield put({ type: SUCCESS_GET_ALL_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    }
}

export function* getActivity_SupplimentLatestModifiedDateSaga() {
    console.log('latest date');
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/activities/lastModifiedTime`);
        yield put({
            type: SUCCESS_GET_ACTIVITY_SUPPLIMENT_LAST_MODIFIED_DATE_TIME,
            data: responseData.data
        });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_GET_ACTIVITY_SUPPLIMENT_LAST_MODIFIED_DATE_TIME, data: '' });
    }
}

export function* saveActivity_SupplimentDataHandler(action) {
    console.log('action.data:' + action.data);
    action.data.path = `${process.env.REACT_APP_TOUR_URL}/activities`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: ADD_FAILED_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    }
}

export function* getActivity_SupplimentDetailsByCodeSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_TOUR_URL}/activities/${action.data.id}`);
        console.log('response data:' + responseData);
        yield put({ type: SUCCESS_GET_ACTIVITY_SUPPLIMENT_DETAILS_BY_CODE, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ACTIVITY_SUPPLIMENT_DETAILS_BY_CODE, data: responseData.data });
    }
}

export function* updateActivity_SupplimentDataSaga(action) {
    action.data.path = `${process.env.REACT_APP_TOUR_URL}/activities`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);
        console.log('response data:' + responseData);
        yield put({ type: UPDATE_SUCCESS_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    }
}

export function* checkActivity_SupplimentDupicateCodeSaga(action) {
    console.log(`${action.type}`);
    console.log(`${action.data}`);
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_TOUR_URL}/${action.data.code}/${action.data.type}`);

        yield put({ type: ACTIVITY_SUPPLIMENT_CODE_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: ACTIVITY_SUPPLIMENT_CODE_DUPLICATE, data: responseData });
    }
}

export function* getAllActiveActivity_SupplimentDataSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/Activity_Suppliment/active`);
        yield put({ type: SUCCESS_GET_ALL_ACTIVE_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_ACTIVE_ACTIVITY_SUPPLIMENT_DATA, data: responseData.data });
    }
}
