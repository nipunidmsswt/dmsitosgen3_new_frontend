import { put, call } from 'redux-saga/effects';
import { create, getById, updateWithUpload, get, createWithUpload } from '../../../apis/Apis';
import {
    ADD_SUCCESS_LOCATION_DATA,
    ADD_FAILED_LOCATION_DATA,
    UPDATE_SUCCESS_LOCATION_DATA,
    UPDATE_FAILED_LOCATION_DATA,
    SUCCESS_LOCATION_LIST_DATA,
    FAILED_LOCATION_LIST_DATA,
    SUCCESS_GET_LOCATION_DATA_BY_ID,
    FAILED_GET_LOCATION_DATA_BY_ID,
    CHECK_LOCATION_DUPLICATE,
    SUCCESS_LAST_MODIFIED_DATE_LOCATION,
    FAILED_LAST_MODIFIED_DATE_LOCATION
} from '../../constant/master/LocationConstant';

//location saga

export function* saveLocationSaga(action) {
    action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/location/`;
    let responseData = [];
    try {
        console.log('saga started');
        responseData = yield call(createWithUpload, action.data);
        // console.log(responseData.staus);
        console.log('saga finished');
        if (responseData.status == 201 || responseData.status == 200) {
            yield put({ type: ADD_SUCCESS_LOCATION_DATA, data: action.data });
        } else {
            yield put({ type: ADD_FAILED_LOCATION_DATA, data: 'error' });
        }
    } catch (e) {
        yield put({ type: ADD_FAILED_LOCATION_DATA, data: 'error' });
    }
}

export function* getLocationByIdSaga(action) {
    console.log('getTaxByIdSaga tax saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_ACCOMODATION_URL}/location/${action.data.id}`);
        console.log(responseData);
        yield put({ type: SUCCESS_GET_LOCATION_DATA_BY_ID, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_LOCATION_DATA_BY_ID, data: responseData.data });
    }
}

export function* updateLocationSaga(action) {
    console.log('updateTaxSaga tax saga');
    console.log(action);
    action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/location/`;
    let responseData = [];
    try {
        responseData = yield call(updateWithUpload, action.data);
        console.log(responseData);
        yield put({ type: UPDATE_SUCCESS_LOCATION_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_LOCATION_DATA, data: responseData.data });
    }
}

export function* getAllLocatonSaga() {
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_ACCOMODATION_URL + '/location/');
        console.log(responseData.data.payload);
        yield put({ type: SUCCESS_LOCATION_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_LOCATION_LIST_DATA, data: responseData.data });
    }
}

export function* checkDupicateLocationSaga(action) {
    console.log('checkDupicateTaxCodeSaga tax saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_ACCOMODATION_URL}/taxCodeCheck/${action.data.taxCode}`);
        console.log(responseData);
        yield put({ type: CHECK_LOCATION_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: CHECK_LOCATION_DUPLICATE, data: responseData });
    }
}

export function* checkLatestLocationModifiedDateSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_ACCOMODATION_URL}/location/lastModifiedTime`);
        console.log('response data last:' + responseData);
        yield put({ type: SUCCESS_LAST_MODIFIED_DATE_LOCATION, data: responseData.data });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_LAST_MODIFIED_DATE_LOCATION, data: '' });
    }
}
