import { GET_ALL_CURRENCY_LIST, SAVE_EXPENSE_TYPES } from 'store/constant/master/ExpenseTypesConstant';

export const getAllCurrencyListData = (data) => {
    return {
        type: GET_ALL_CURRENCY_LIST,
        data
    };
};

export const saveExpenseTypesData = (data) => {
    console.log(data);
    return {
        type: SAVE_EXPENSE_TYPES,
        data
    };
};

// export const getAllFacilityCounterData = () => {
//     return {
//         type: GET_ALL_FACILITYCOUNTER_DATA
//     };
// };

// export const getFacilityCounterDataById = (id) => {
//     return {
//         type: GET_FACILITYCOUNTER_DATA_BY_ID,
//         data: { id }
//     };
// };

// export const updateFacilityCounterData = (data) => {
//     return {
//         type: UPDATE_FACILITYCOUNTER_DATA,
//         data
//     };
// };

// export const getLatestModifiedDetails = () => {
//     return {
//         type: GET_FACILITYCOUNTER_LAST_MODIFIED_DATE_TIME
//     };
// };

// export const checkDuplicateFacilityCounterCode = (code) => {
//     console.log('owner code:' + code);
//     return {
//         type: CHECK_FACILITYCOUNTER_CODE_DUPLICATE,
//         data: { code }
//     };
// };
