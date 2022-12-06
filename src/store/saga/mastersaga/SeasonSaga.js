import { put, call } from 'redux-saga/effects';
import { create, getById, get, update } from '../../../apis/Apis';
import {
    ADD_SUCCESS_SEASON_DATA,
    ADD_FAILED_SEASON_DATA,
    UPDATE_SUCCESS_SEASON_DATA,
    UPDATE_FAILED_SEASON_DATA,
    SUCCESS_SEASON_LIST_DATA,
    FAILED_SEASON_LIST_DATA,
    SUCCESS_GET_SEASON_DATA_BY_ID,
    FAILED_GET_SEASON_DATA_BY_ID,
    CHECK_SEASON_DUPLICATE,
    SUCCESS_LAST_MODIFIED_DATE_SEASON,
    FAILED_LAST_MODIFIED_DATE_SEASON
} from '../../constant/master/SeasonConstant';

//Season saga

export function* saveSeasonSaga(action) {
    action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/season/`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        console.log(responseData.data.payload);

        yield put({ type: ADD_SUCCESS_SEASON_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: ADD_FAILED_SEASON_DATA, data: responseData.data });
    }
}

export function* getSeasonByIdSaga(action) {
    console.log('getTaxByIdSaga tax saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_ACCOMODATION_URL}/season/${action.data.id}`);
        console.log(responseData);
        yield put({
            type: SUCCESS_GET_SEASON_DATA_BY_ID,
            data: responseData.data
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: FAILED_GET_SEASON_DATA_BY_ID,
            data: responseData.data
        });
    }
}

export function* updateSeasonSaga(action) {
    console.log('updateSeasonSaga tax saga');
    console.log(action);

    action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/season/${action.data.mainSeason}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);
        console.log(responseData);
        yield put({ type: UPDATE_SUCCESS_SEASON_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_SEASON_DATA, data: responseData.data });
    }
}

export function* getAllSeasonSaga() {
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_ACCOMODATION_URL + '/season/');
        console.log(responseData.data.payload);
        yield put({ type: SUCCESS_SEASON_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_SEASON_LIST_DATA, data: responseData.data });
    }
}

export function* checkDupicateSeasonSaga(action) {
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_ACCOMODATION_URL}/sessionCheck/${action.data.taxCode}`);
        console.log(responseData);
        yield put({ type: CHECK_SEASON_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: CHECK_SEASON_DUPLICATE, data: responseData });
    }
}

export function* checkLatestSeasonModifiedDateSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_ACCOMODATION_URL}/season/lastModifiedTime`);
        console.log('response data last:' + responseData);
        yield put({
            type: SUCCESS_LAST_MODIFIED_DATE_SEASON,
            data: responseData.data
        });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_LAST_MODIFIED_DATE_SEASON, data: '' });
    }
}
