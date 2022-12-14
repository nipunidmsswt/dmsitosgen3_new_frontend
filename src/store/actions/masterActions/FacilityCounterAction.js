import {
    CHECK_FACILITYCOUNTER_CODE_DUPLICATE,
    GET_ALL_FACILITYCOUNTER_DATA,
    GET_FACILITYCOUNTER_DATA_BY_ID,
    GET_FACILITYCOUNTER_LAST_MODIFIED_DATE_TIME,
    SAVE_FACILITYCOUNTER_DATA,
    UPDATE_FACILITYCOUNTER_DATA
} from '../../constant/master/FacilityCounterConstant';

export const saveFacilityCounterData = (data) => {
    return {
        type: SAVE_FACILITYCOUNTER_DATA,
        data
    };
};

export const getAllFacilityCounterData = () => {
    return {
        type: GET_ALL_FACILITYCOUNTER_DATA
    };
};

export const getFacilityCounterDataById = (id) => {
    return {
        type: GET_FACILITYCOUNTER_DATA_BY_ID,
        data: { id }
    };
};

export const updateFacilityCounterData = (data) => {
    return {
        type: UPDATE_FACILITYCOUNTER_DATA,
        data
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_FACILITYCOUNTER_LAST_MODIFIED_DATE_TIME
    };
};

export const checkDuplicateFacilityCounterCode = (code) => {
    console.log('owner code:' + code);
    return {
        type: CHECK_FACILITYCOUNTER_CODE_DUPLICATE,
        data: { code }
    };
};
