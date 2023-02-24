import {
    ADD_SUCCESS_BANK_DETAILS_DATA,
    ADD_FAILED_BANK_DETAILS_DATA,
    SUCCESS_GET_BANK_DETAILS_BY_ID,
    FAILED_GET_BANK_DETAILS_DATA_BY_ID,
    SUCCESS_BANK_DETAILS_LIST_DATA,
    FAILED_BANK_DETAILS_LIST_DATA,
    UPDATE_FAILED_BANK_DETAILS_DATA,
    UPDATE_SUCCESS_BANK_DETAILS_DATA,
    BANK_DETAILS_DUPLICATE,
    FAILED_LAST_MODIFIED_DATE_BANK_DETAILS,
    SUCCESS_LAST_MODIFIED_DATE_BANK_DETAILS
} from '../../constant/master/BankConstant';

const initialState = {
    bankDetail: null,
    bankDetails: [],
    bankDetailToUpdate: null,
    errorMsg: null,
    duplicateBankDetail: null,
    lastModifiedDateTime: null
};

export const seasonReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_BANK_DETAILS_DATA:
            return { ...state, bankDetail: data.payload[0] };

        case ADD_FAILED_BANK_DETAILS_DATA:
            return {
                ...state,
                bankDetail: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_BANK_DETAILS_BY_ID:
            return { ...state, bankDetailToUpdate: data.payload[0] };

        case FAILED_GET_BANK_DETAILS_DATA_BY_ID:
            return {
                ...state,
                bankDetailToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_BANK_DETAILS_DATA:
            return { ...state, bankDetail: data.payload[0] };

        case UPDATE_FAILED_BANK_DETAILS_DATA:
            return {
                ...state,
                bankDetail: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_BANK_DETAILS_LIST_DATA:
            return { ...state, bankDetails: data };

        case FAILED_BANK_DETAILS_LIST_DATA:
            return { ...state, bankDetails: data };

        case BANK_DETAILS_DUPLICATE:
            return { ...state, duplicateBranch: data };

        case FAILED_LAST_MODIFIED_DATE_BANK_DETAILS:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case SUCCESS_LAST_MODIFIED_DATE_BANK_DETAILS:
            return { ...state, lastModifiedDateTime: data };

        default:
            return state;
    }
};
