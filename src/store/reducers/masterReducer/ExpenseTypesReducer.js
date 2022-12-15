import {
    ADD_FAILED_EXPENSE_TYPES,
    ADD_SUCCESS_EXPENSE_TYPES,
    FAILED_GET_ALL_CURRENCY_LIST,
    SUCESS_GET_ALL_CURRENCY_LIST
} from 'store/constant/master/ExpenseTypesConstant';

const initialState = {
    expenseType: null,
    currencyList: [],
    expenseTypes: [],
    expenseTypeToUpdate: null,
    errorMsg: null,
    duplicateExpenseType: null,
    lastModifiedDateTime: null
};

export const expenseTypesReducer = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case ADD_SUCCESS_EXPENSE_TYPES:
            return { ...state, expenseType: data.payload[0] };

        case ADD_FAILED_EXPENSE_TYPES:
            return {
                ...state,
                expenseType: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        // case SUCCESS_GET_TAX_DATA_BY_ID:
        //     console.warn('SUCCESS_GET_TAX_DATA_BY_ID', action.payload);
        //     console.log(data.payload[0]);
        //     return { ...state, taxToUpdate: data.payload[0] };

        // case FAILED_GET_TAX_DATA_BY_ID:
        //     console.warn('FAILED_GET_TAX_DATA_BY_ID', action);
        //     console.log(data);
        //     return {
        //         ...state,
        //         taxToUpdate: null,
        //         errorMsg: data ? data.errorMessages : 'netwok error'
        //     };

        // case UPDATE_SUCCESS_TAX_DATA:
        //     console.log(data.payload[0]);
        //     console.warn('UPDATE_SUCCESS_TAX_DATA', action);
        //     console.log(data.payload[0]);
        //     return { ...state, tax: data.payload[0] };

        // case UPDATE_FAILED_TAX_DATA:
        //     console.warn('UPDATE_FAILED_TAX_DATA', action);
        //     console.log(data);
        //     return {
        //         ...state,
        //         tax: null,
        //         errorMsg: data ? data.errorMessages : 'netwok error'
        //     };

        case SUCESS_GET_ALL_CURRENCY_LIST:
            console.log(data.payload[0]);
            return { ...state, currencyList: data.payload[0] };

        case FAILED_GET_ALL_CURRENCY_LIST:
            console.log(data);
            return { ...state, currencyList: data };

        // case TAX_DUPLICATE:
        //     return { ...state, duplicateTax: data };

        // case SUCCESS_LAST_MODIFIED_DATE_TAX:
        //     console.log('reducer:' + data.payload[0]);
        //     return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        // case FAILED_LAST_MODIFIED_DATE_TAX:
        //     return { ...state, lastModifiedDateTime: data };

        default:
            return state;
    }
};
