import { takeLatest } from 'redux-saga/effects';
import {
    CHECK_TAX_DUPLICATE,
    GET_ALL_TAX_DATA,
    GET_LAST_MODIFIED_DATE_TIME_TAX,
    GET_TAX_DATA_BY_ID,
    SAVE_TAX_DATA,
    UPDATE_TAX_DATA
} from 'store/constant/master/TaxMasterConstant';
import {
    checkDupicateTaxCodeSaga,
    checkLatestTaxModifiedDateSaga,
    getAllTaxSaga,
    getTaxByIdSaga,
    saveTaxSaga,
    updateTaxSaga
} from './mastersaga/TaxSaga';

export function* wacherSaga() {
    // tax setup
    yield takeLatest(SAVE_TAX_DATA, saveTaxSaga);
    yield takeLatest(GET_TAX_DATA_BY_ID, getTaxByIdSaga);
    yield takeLatest(GET_ALL_TAX_DATA, getAllTaxSaga);
    yield takeLatest(UPDATE_TAX_DATA, updateTaxSaga);
    yield takeLatest(CHECK_TAX_DUPLICATE, checkDupicateTaxCodeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_TAX, checkLatestTaxModifiedDateSaga);
}
