import { put, call } from 'redux-saga/effects';
import { get } from '../../../apis/ApiService';
import { SUCCESS_CURRENCY_LIST_DATA, FAILED_CURRENCY_LIST_DATA } from '../../constant/apiServiceConstant/ApiServiceConstant';

export function* getAllCurrenciesSaga() {
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_CURRENCY_LIST_URL);
        console.log(responseData.data.currencies);
        yield put({ type: SUCCESS_CURRENCY_LIST_DATA, data: responseData.data.currencies });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_CURRENCY_LIST_DATA, data: responseData.data.currencies });
    }
}
