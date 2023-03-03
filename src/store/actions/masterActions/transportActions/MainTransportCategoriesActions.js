import {
    SAVE_MAIN_TRANSPORT_DETAILS_DATA,
    GET_ALL_MAIN_TRANSPORT_DETAILS_DATA,
    GET_MAIN_TRANSPORT_DETAILS_BY_ID,
    UPDATE_MAIN_TRANSPORT_DETAILS_DATA,
    CHECK_MAIN_TRANSPORT_DETAILS_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_MAIN_TRANSPORT_DETAILS
} from '../../../constant/master/TransportMasterConstant/MainTransportCategory';

export const saveMainTransportDetailsData = (data) => {
    return {
        type: SAVE_MAIN_TRANSPORT_DETAILS_DATA,
        data
    };
};

export const getAllMainTransportDetailsData = () => {
    return {
        type: GET_ALL_MAIN_TRANSPORT_DETAILS_DATA
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_MAIN_TRANSPORT_DETAILS
    };
};

export const getMainTransportDetailstDataById = (id) => {
    return {
        type: GET_MAIN_TRANSPORT_DETAILS_BY_ID,
        data: { id }
    };
};

export const updateMainTransportDetailsData = (data) => {
    return {
        type: UPDATE_MAIN_TRANSPORT_DETAILS_DATA,
        data
    };
};

export const checkDuplicateMainTransportDetailsCode = (MainTransportCode) => {
    return {
        type: CHECK_MAIN_TRANSPORT_DETAILS_DUPLICATE,
        data: { MainTransportCode }
    };
};
