import {
    ADD_SUCCESS_HOTEL_FACILITY_DATA,
    ADD_FAILED_HOTEL_FACILITY_DATA,
    SUCCESS_GET_HOTEL_FACILITY_DATA_BY_ID,
    FAILED_GET_HOTEL_FACILITY_DATA_BY_ID,
    SUCCESS_HOTEL_FACILITY_LIST_DATA,
    FAILED_HOTEL_FACILITY_LIST_DATA,
    UPDATE_FAILED_HOTEL_FACILITY_DATA,
    UPDATE_SUCCESS_HOTEL_FACILITY_DATA,
    HOTEL_FACILITY_DUPLICATE,
    FAILED_LAST_MODIFIED_DATE_HOTEL_FACILITY,
    SUCCESS_LAST_MODIFIED_DATE_HOTEL_FACILITY,
    SUCCESS_HOTEL_FACILITY_TYPES_LIST_DATA,
    FAILED_HOTEL_FACILITY_TYPES_LIST_DATA
} from '../../constant/master/HotelFacilityConstant';

const initialState = {
    hotelFacility: null,
    hotelFacilities: [],
    hotelFacilityToUpdate: null,
    errorMsg: null,
    duplicateHotelFacility: null,
    lastModifiedDateTime: null,
    hotelFacilityTypes: []
};

export const hotelFacilityReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_HOTEL_FACILITY_DATA:
            return { ...state, hotelFacility: data.payload[0] };

        case ADD_FAILED_HOTEL_FACILITY_DATA:
            return {
                ...state,
                hotelFacility: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_HOTEL_FACILITY_DATA_BY_ID:
            return { ...state, hotelFacilityToUpdate: data.payload[0] };

        case FAILED_GET_HOTEL_FACILITY_DATA_BY_ID:
            return {
                ...state,
                hotelFacilityToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_HOTEL_FACILITY_DATA:
            return { ...state, hotelFacility: data.payload[0] };

        case UPDATE_FAILED_HOTEL_FACILITY_DATA:
            return {
                ...state,
                hotelFacility: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_HOTEL_FACILITY_LIST_DATA:
            return { ...state, hotelFacilities: data };

        case FAILED_HOTEL_FACILITY_LIST_DATA:
            return { ...state, hotelFacilities: data };

        case HOTEL_FACILITY_DUPLICATE:
            return { ...state, duplicateHotelFacility: data };

        case SUCCESS_LAST_MODIFIED_DATE_HOTEL_FACILITY:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_LAST_MODIFIED_DATE_HOTEL_FACILITY:
            return { ...state, lastModifiedDateTime: data };

        case SUCCESS_HOTEL_FACILITY_TYPES_LIST_DATA:
            return { ...state, hotelFacilityTypes: data };

        case FAILED_HOTEL_FACILITY_TYPES_LIST_DATA:
            return { ...state, hotelFacilityTypes: data };

        default:
            return state;
    }
};
