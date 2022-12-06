import {
    SAVE_HOTEL_FACILITY_DATA,
    GET_ALL_HOTEL_FACILITY_DATA,
    GET_HOTEL_FACILITY_DATA_BY_ID,
    UPDATE_HOTEL_FACILITY_DATA,
    CHECK_HOTEL_FACILITY_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_HOTEL_FACILITY,
    GET_ALL_HOTEL_FACILITY_TYPES_DATA
} from '../../constant/master/HotelFacilityConstant';

export const saveHotelFacilityData = (data) => {
    return {
        type: SAVE_HOTEL_FACILITY_DATA,
        data
    };
};

export const getAllHotelFacilityData = () => {
    return {
        type: GET_ALL_HOTEL_FACILITY_DATA
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_HOTEL_FACILITY
    };
};

export const getHotelFacilityDataById = (id) => {
    return {
        type: GET_HOTEL_FACILITY_DATA_BY_ID,
        data: { id }
    };
};

export const updateHotelFacilityData = (data) => {
    return {
        type: UPDATE_HOTEL_FACILITY_DATA,
        data
    };
};

export const checkDuplicateHotelFacilityCode = (code) => {
    return {
        type: CHECK_HOTEL_FACILITY_DUPLICATE,
        data: { code }
    };
};

export const getAllFacilityTypes = (code) => {
    return {
        type: GET_ALL_HOTEL_FACILITY_TYPES_DATA
    };
};
