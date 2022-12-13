import {
    SAVE_EXCHNAGE_RATE_TYPE_DATA,
    UPDATE_EXCHNAGE_RATE_TYPE_DATA,
    GET_ALL_EXCHNAGE_RATE_TYPE_DATA,
    GET_EXCHNAGE_RATE_TYPE_BY_ID,
    GET_LAST_MODIFIED_DATE_TIME_EXCHNAGE_RATE_TYPE
} from '../../../constant/master/ExchangeRateConstant';

export const saveExChangeRateData = (data) => {
    console.log('saveExChangeRateData action s called', data);
    return {
        type: SAVE_EXCHNAGE_RATE_TYPE_DATA,
        data
    };
};

export const updateExChangeRateData = (data) => {
    console.log('updateTaxData action s called', data);
    return {
        type: UPDATE_EXCHNAGE_RATE_TYPE_DATA,
        data
    };
};

export const getAllExChangeRateData = () => {
    console.log('ggetAllExChangeRateData called');
    return {
        type: GET_ALL_EXCHNAGE_RATE_TYPE_DATA
    };
};

export const getExChangeRateDataById = (id) => {
    console.log('getTaxDataById  called', id);
    return {
        type: GET_EXCHNAGE_RATE_TYPE_BY_ID,
        data: { id }
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_EXCHNAGE_RATE_TYPE
    };
};
