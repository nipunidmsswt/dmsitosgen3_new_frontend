import {
    ADD_FAILED_SERVICEOFFERED_DATA,
    ADD_SUCCESS_SERVICEOFFERED_DATA,
    FAILED_GET_SERVICEOFFERED_DATA_BY_ID,
    FAILED_SERVICEOFFERED_LAST_MODIFIED_DATE,
    FAILED_SERVICEOFFERED_LIST_DATA,
    SERVICEOFFERED_CODE_DUPLICATE,
    SUCCESS_GET_SERVICEOFFERED_DATA_BY_ID,
    SUCCESS_SERVICEOFFERED_LAST_MODIFIED_DATE,
    SUCCESS_SERVICEOFFERED_LIST_DATA,
    UPDATE_FAILED_SERVICEOFFERED_DATA,
    UPDATE_SUCCESS_SERVICEOFFERED_DATA
} from '../../constant/master/ServiceOfferedConstant';

const initialState = {
    serviceOffered: null,
    serviceOfferedList: [],
    serviceOfferedToUpdate: null,
    errorMsg: null,
    duplicateserviceOffered: null,
    lastModifiedDateTime: null
};

export const serviceOfferedDataReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_SERVICEOFFERED_DATA:
            console.warn('SUCCESS_SERVICEOFFERED_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, serviceOffered: data.payload[0] };

        case ADD_FAILED_SERVICEOFFERED_DATA:
            console.warn('FAILED_SERVICEOFFERED_DATA', action);
            console.log(data);
            return {
                ...state,
                serviceOffered: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_SERVICEOFFERED_DATA_BY_ID:
            console.warn('SUCCESS_GET_SERVICEOFFERED_DATA_BY_ID', action.payload);
            console.log('reucer log :' + data.payload[0]);
            return { ...state, serviceOfferedToUpdate: data.payload[0] };

        case FAILED_GET_SERVICEOFFERED_DATA_BY_ID:
            console.warn('FAILED_GET_SERVICEOFFERED_DATA_BY_ID', action);
            console.log(data);
            return {
                ...state,
                serviceOfferedToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_SERVICEOFFERED_DATA:
            return { ...state, serviceOffered: data.payload[0] };

        case UPDATE_FAILED_SERVICEOFFERED_DATA:
            return {
                ...state,
                serviceOffered: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_SERVICEOFFERED_LIST_DATA:
            return { ...state, serviceOfferedList: data };

        case FAILED_SERVICEOFFERED_LIST_DATA:
            return { ...state, serviceOfferedList: data };

        case SERVICEOFFERED_CODE_DUPLICATE:
            return { ...state, duplicateserviceOffered: data };

        case SUCCESS_SERVICEOFFERED_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };
        case FAILED_SERVICEOFFERED_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data };

        // data.payload[0].dateTime.replace("T"," ")
        default:
            return state;
    }
};
