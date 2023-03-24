import {
    CHECK_BAGGAGE_TRANSPORT_RATE_CODE_DUPLICATE,
    CLEAR_BAGGAGE_TRANSPORT_RATE,
    GET_ALL_BAGGAGE_TRANSPORT_RATE,
    GET_BAGGAGE_TRANSPORT_RATE_BY_ID,
    GET_BAGGAGE_TRANSPORT_RATE_LAST_MODIFIED_DATE_TIME,
    SAVE_BAGGAGE_TRANSPORT_RATE,
    UPDATE_BAGGAGE_TRANSPORT_RATE
} from 'store/constant/master/TransportMasterConstant/PaxVehicleRateConstant';

export const savePaxVehicleRateData = (data) => {
    return {
        type: SAVE_BAGGAGE_TRANSPORT_RATE,
        data
    };
};

export const getAllPaxVehicleRateData = () => {
    return {
        type: GET_ALL_BAGGAGE_TRANSPORT_RATE
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_BAGGAGE_TRANSPORT_RATE_LAST_MODIFIED_DATE_TIME
    };
};

export const getPaxVehicleRateDataById = (id) => {
    return {
        type: GET_BAGGAGE_TRANSPORT_RATE_BY_ID,
        data: { id }
    };
};

export const updatePaxVehicleRateData = (data) => {
    return {
        type: UPDATE_BAGGAGE_TRANSPORT_RATE,
        data
    };
};

export const checkDuplicatePaxVehicleRateCode = (data) => {
    return {
        type: CHECK_BAGGAGE_TRANSPORT_RATE_CODE_DUPLICATE,
        data: { data }
    };
};

export const clearPaxVehicleRate = () => {
    return {
        type: CLEAR_BAGGAGE_TRANSPORT_RATE
    };
};
