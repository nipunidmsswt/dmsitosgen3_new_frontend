import {
    ADD_FAILED_PRODUCT_DATA,
    ADD_SUCCESS_PRODUCT_DATA,
    FAILED_GET_PRODUCT_DATA_BY_ID,
    FAILED_PRODUCT_LAST_MODIFIED_DATE,
    FAILED_PRODUCT_LIST_DATA,
    PRODUCT_CODE_DUPLICATE,
    SUCCESS_GET_PRODUCT_DATA_BY_ID,
    SUCCESS_PRODUCT_LAST_MODIFIED_DATE,
    SUCCESS_PRODUCT_LIST_DATA,
    UPDATE_FAILED_PRODUCT_DATA,
    UPDATE_SUCCESS_PRODUCT_DATA
} from '../../constant/master/ProductDataMasterConstant';
import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';

export function* saveProductDataHandler(action) {
    action.data.path = `${process.env.REACT_APP_TOUR_URL}/product`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_PRODUCT_DATA, data: responseData.data });
    } catch (e) {
        console.log('e:' + e);
        yield put({ type: ADD_FAILED_PRODUCT_DATA, data: responseData.data });
    }
}

export function* getAllProductSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/products`);
        yield put({ type: SUCCESS_PRODUCT_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_PRODUCT_LIST_DATA, data: responseData.data });
    }
}

export function* getProductByIdSaga(action) {
    // action.data.path = "/tourCategory";
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_TOUR_URL}/product/${action.data.id}`);
        console.log('response data:' + responseData);
        yield put({
            type: SUCCESS_GET_PRODUCT_DATA_BY_ID,
            data: responseData.data
        });
    } catch (e) {
        yield put({ type: FAILED_GET_PRODUCT_DATA_BY_ID, data: responseData.data });
    }
}

export function* updateProductDataSaga(action) {
    action.data.path = `${process.env.REACT_APP_TOUR_URL}/product/${action.data.productCode}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);

        yield put({ type: UPDATE_SUCCESS_PRODUCT_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_PRODUCT_DATA, data: responseData.data });
    }
}

export function* checkProductLatestModifiedDateSaga() {
    console.log('latest date');
    let responseData = [];
    // action.data.path = `/product`;
    try {
        responseData = yield call(get, `${process.env.REACT_APP_TOUR_URL}/product/lastModifiedTime`);
        yield put({
            type: SUCCESS_PRODUCT_LAST_MODIFIED_DATE,
            data: responseData.data
        });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_PRODUCT_LAST_MODIFIED_DATE, data: '' });
    }
}

export function* checkDupicateProductCodeSaga(action) {
    console.log('checkDupicateProductCodeSaga:' + action);
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_TOUR_URL}/productCodeCheck/${action.data.productCode}`);
        console.log('response data:' + responseData);
        yield put({
            type: PRODUCT_CODE_DUPLICATE,
            data: responseData.data.errorMessages
        });
    } catch (e) {
        console.log(responseData);
        yield put({
            type: PRODUCT_CODE_DUPLICATE,
            data: responseData.data.errorMessages
        });
    }
}
