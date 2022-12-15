import {
    ADD_FAILED_EXPENSE_TYPES,
    ADD_SUCCESS_EXPENSE_TYPES,
    FAILED_GET_ALL_CURRENCY_LIST,
    SUCESS_GET_ALL_CURRENCY_LIST
} from 'store/constant/master/ExpenseTypesConstant';
import { put, takeEvery, call } from 'redux-saga/effects';
import { create, getById, update, get } from '../../../apis/Apis';

export function* getAllCurrencyListData() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_FINANCE_URL}/currencyList/`);
        yield put({ type: SUCESS_GET_ALL_CURRENCY_LIST, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_CURRENCY_LIST, data: responseData.data });
    }
}

export function* saveExpenseTypesDataHandler(action) {
    action.data.path = `${process.env.REACT_APP_TRANSPORT_URL}/expenseTypes/`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        yield put({ type: ADD_SUCCESS_EXPENSE_TYPES, data: responseData.data });
    } catch (e) {
        console.log('e:' + e);
        yield put({ type: ADD_FAILED_EXPENSE_TYPES, data: responseData.data });
    }
}

// export function* getAllExpenseTypesDataSaga() {
//     let responseData = [];
//     try {
//         responseData = yield call(get, `${process.env.REACT_APP_ACCOMODATION_URL}/ExpenseTypes/`);
//         yield put({ type: SUCCESS_HOTEL_BASIS_LIST_DATA, data: responseData.data });
//     } catch (e) {
//         console.log(e);
//         yield put({ type: FAILED_HOTEL_BASIS_LIST_DATA, data: responseData.data });
//     }
// }

// export function* getExpenseTypesByCodeSaga(action) {
//     let responseData = [];
//     try {
//         responseData = yield call(getById, `${process.env.REACT_APP_ACCOMODATION_URL}/ExpenseTypes/${action.data.id}`);
//         console.log('response data:' + responseData);
//         yield put({
//             type: SUCCESS_GET_HOTEL_BASIS_BY_ID,
//             data: responseData.data
//         });
//     } catch (e) {
//         yield put({ type: FAILED_GET_HOTEL_BASIS_BY_ID, data: responseData.data });
//     }
// }

// export function* updateExpenseTypesDataSaga(action) {
//     console.log(`${action.data.code}`);
//     action.data.path = `${process.env.REACT_APP_ACCOMODATION_URL}/ExpenseTypes/${action.data.code}`;
//     let responseData = [];
//     try {
//         responseData = yield call(update, action.data);

//         yield put({ type: UPDATE_SUCCESS_HOTEL_BASIS, data: responseData.data });
//     } catch (e) {
//         console.log(e);
//         yield put({ type: UPDATE_FAILED_HOTEL_BASIS, data: responseData.data });
//     }
// }

// export function* getExpenseTypesLatestModifiedDateSaga() {
//     console.log('latest date');
//     let responseData = [];
//     // action.data.path = `/product`;
//     try {
//         responseData = yield call(get, `${process.env.REACT_APP_ACCOMODATION_URL}/ExpenseTypes/lastModifiedDateTime`);
//         yield put({
//             type: SUCCESS_HOTEL_BASIS_LAST_MODIFIED_DATE,
//             data: responseData.data
//         });
//     } catch (e) {
//         console.log('Error:' + e);
//         yield put({ type: FAILED_HOTEL_BASIS_LAST_MODIFIED_DATE, data: '' });
//     }
// }

// export function* checkExpenseTypesDupicateCodeSaga(action) {
//     console.log('checkExpenseTypesDupicateCodeSaga:' + action.data.ExpenseTypesCode);
//     let responseData = [];
//     try {
//         responseData = yield call(
//             getById,
//             `${process.env.REACT_APP_ACCOMODATION_URL}/ExpenseTypes/codeDuplicate/${action.data.ExpenseTypesCode}`
//         );
//         console.log('response data:' + responseData);
//         yield put({
//             type: HOTEL_BASIS_CODE_DUPLICATE,
//             data: responseData.data
//         });
//     } catch (e) {
//         console.log(responseData);
//         yield put({
//             type: HOTEL_BASIS_CODE_DUPLICATE,
//             data: responseData
//         });
//     }
// }
