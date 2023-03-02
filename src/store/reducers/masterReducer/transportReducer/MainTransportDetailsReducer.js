import {
    ADD_SUCCESS_MAIN_TRANSPORT_DETAILS_DATA,
    ADD_FAILED_MAIN_TRANSPORT_DETAILS_DATA,
    SUCCESS_GET_MAIN_TRANSPORT_DETAILS_DATA_BY_ID,
    FAILED_GET_MAIN_TRANSPORT_DETAILS_DATA_BY_ID,
    SUCCESS_MAIN_TRANSPORT_DETAILS_LIST_DATA,
    FAILED_MAIN_TRANSPORT_DETAILS_LIST_DATA,
    UPDATE_FAILED_MAIN_TRANSPORT_DETAILS_DATA,
    UPDATE_SUCCESS_MAIN_TRANSPORT_DETAILS_DATA,
    MAIN_TRANSPORT_DETAILS_DUPLICATE,
    FAILED_LAST_MODIFIED_DATE_MAIN_TRANSPORT_DETAILS,
    SUCCESS_LAST_MODIFIED_DATE_MAIN_TRANSPORT_DETAILS
} from '../../../constant/master/TransportMasterConstant/MainTransportCategory';

const initialState = {
    mainTransportDetail: null,
    mainTransportDetails: [],
    mainTransportDetailToUpdate: null,
    errorMsg: null,
    duplicateMainTransportDetail: null,
    lastModifiedDateTime: null
};

export const MainTransportCategoryReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_MAIN_TRANSPORT_DETAILS_DATA:
            return { ...state, mainTransportDetail: data.payload[0] };

        case ADD_FAILED_MAIN_TRANSPORT_DETAILS_DATA:
            return {
                ...state,
                mainTransportDetail: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_MAIN_TRANSPORT_DETAILS_DATA_BY_ID:
            return { ...state, mainTransportDetailToUpdate: data.payload[0] };

        case FAILED_GET_MAIN_TRANSPORT_DETAILS_DATA_BY_ID:
            return {
                ...state,
                mainTransportDetailToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_MAIN_TRANSPORT_DETAILS_DATA:
            return { ...state, mainTransportDetail: data.payload[0] };

        case UPDATE_FAILED_MAIN_TRANSPORT_DETAILS_DATA:
            return {
                ...state,
                mainTransportDetail: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_MAIN_TRANSPORT_DETAILS_LIST_DATA:
            return { ...state, mainTransportDetails: data };

        case FAILED_MAIN_TRANSPORT_DETAILS_LIST_DATA:
            return { ...state, mainTransportDetails: data };

        case MAIN_TRANSPORT_DETAILS_DUPLICATE:
            return { ...state, duplicateMainTransportDetail: data };

        case SUCCESS_LAST_MODIFIED_DATE_MAIN_TRANSPORT_DETAILS:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_LAST_MODIFIED_DATE_MAIN_TRANSPORT_DETAILS:
            return { ...state, lastModifiedDateTime: data };

        default:
            return state;
    }
};
