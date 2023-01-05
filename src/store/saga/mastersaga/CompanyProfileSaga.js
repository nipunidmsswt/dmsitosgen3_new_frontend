import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';
import {
    ADD_SUCCESS_COMPANY_PROFILE,
    ADD_FAILED_COMPANY_PROFILE,
    FAILED_GET_COMPANY_PROFILE_BY_ID,
    SUCCESS_GET_COMPANY_PROFILE_BY_ID,
    UPDATE_FAILED_COMPANY_PROFILE,
    SUCCESS_COMPANY_PROFILE_LAST_MODIFIED_DATE,
    FAILED_COMPANY_PROFILE_LAST_MODIFIED_DATE,
    UPDATE_SUCCESS_COMPANY_PROFILE,
    SUCCESS_COMPANY_PROFILE_LIST_DATA,
    FAILED_COMPANY_PROFILE_LIST_DATA,
    COMPANY_PROFILE_CODE_DUPLICATE
} from '../../constant/master/CompanyProfilrConstant';

//exchange rate type saga

export function* saveCompanyProfileSaga(action) {
    action.data.path = `${process.env.REACT_APP_COMPANY_INFO_URL}/`;
    let responseData = [];
    let imageUploadResponseData = [];
    try {
        responseData = yield call(create, action.data);
        // imageUploadResponseData = yield call();
        console.log(responseData.data.payload);

        yield put({
            type: ADD_SUCCESS_COMPANY_PROFILE,
            data: responseData.data
        });
    } catch (e) {
        yield put({
            type: ADD_FAILED_COMPANY_PROFILE,
            data: responseData.data
        });
    }
}

export function* getCompanyProfileByIdSaga(action) {
    console.log('getCompanyProfileByIdSaga tax saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_COMPANY_INFO_URL}/${action.data.id}`);

        yield put({ type: SUCCESS_GET_COMPANY_PROFILE_BY_ID, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_COMPANY_PROFILE_BY_ID, data: responseData.data });
    }
}

export function* updateCompanyProfileSaga(action) {
    console.log('updateCompanyProfileSaga tax saga');
    console.log(action);
    action.data.path = `${process.env.REACT_APP_COMPANY_INFO_URL}/${action.data.companyName}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);
        console.log(responseData.data.payload);
        yield put({
            type: UPDATE_SUCCESS_COMPANY_PROFILE,
            data: responseData.data
        });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_COMPANY_PROFILE, data: responseData.data });
    }
}

export function* getAllCompanyProfileDataSaga() {
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_COMPANY_INFO_URL + '/');

        yield put({ type: SUCCESS_COMPANY_PROFILE_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_COMPANY_PROFILE_LIST_DATA, data: responseData.data });
    }
}

export function* checkDupicateCompanyProfileSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_COMPANY_INFO_URL}/codeDuplicate/${action.data.CompanyProfileCode}`);
        yield put({ type: COMPANY_PROFILE_CODE_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: COMPANY_PROFILE_CODE_DUPLICATE, data: responseData });
    }
}

export function* checkLatestCompanyPrfileModifiedDateSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_COMPANY_INFO_URL}/lastModifiedDateTime`);
        console.log('response data last:' + responseData);
        yield put({
            type: SUCCESS_COMPANY_PROFILE_LAST_MODIFIED_DATE,
            data: responseData.data
        });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_COMPANY_PROFILE_LAST_MODIFIED_DATE, data: '' });
    }
}
