import {
    ADD_FAILED_MANAGER_DATA,
    ADD_SUCCESS_MANAGER_DATA,
    FAILED_GET_ALL_ACTIVE_MANAGER_DATA,
    FAILED_GET_ALL_MANAGER_DATA,
    FAILED_GET_MANAGER_DETAILS_BY_CODE,
    FAILED_GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    MANAGER_CODE_DUPLICATE,
    SUCCESS_GET_ALL_ACTIVE_MANAGER_DATA,
    SUCCESS_GET_ALL_MANAGER_DATA,
    SUCCESS_GET_MANAGER_DETAILS_BY_CODE,
    SUCCESS_GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    UPDATE_FAILED_MANAGER_DATA,
    UPDATE_SUCCESS_MANAGER_DATA
} from '../../constant/master/ManagerConstant';

const initialState = {
    manager: null,
    managerList: [],
    managerToUpdate: null,
    errorMsg: null,
    duplicateCodeType: null,
    duplicateCode: null,
    lastModifiedDateTime: null,
    cluterTypesDetails: []
};

export const managerReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_MANAGER_DATA:
            console.warn('ADD_SUCCESS_CODE_AND_NAME_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, manager: data.payload[0] };

        case ADD_FAILED_MANAGER_DATA:
            console.warn('ADD_FAILED_CODE_AND_NAME_DATA', action);
            console.log(data);
            return {
                ...state,
                manager: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_MANAGER_DETAILS_BY_CODE:
            return { ...state, managerToUpdate: data.payload[0] };

        case FAILED_GET_MANAGER_DETAILS_BY_CODE:
            return {
                ...state,
                managerToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_MANAGER_DATA:
            return { ...state, manager: data.payload[0] };

        case UPDATE_FAILED_MANAGER_DATA:
            return {
                ...state,
                manager: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_ALL_MANAGER_DATA:
            return { ...state, managerList: data };

        case FAILED_GET_ALL_MANAGER_DATA:
            return { ...state, managerList: data };

        case MANAGER_CODE_DUPLICATE:
            return { ...state, duplicateCode: data };

        case SUCCESS_GET_MANAGER_LAST_MODIFIED_DATE_TIME:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_GET_MANAGER_LAST_MODIFIED_DATE_TIME:
            return { ...state, lastModifiedDateTime: data };

        case SUCCESS_GET_ALL_ACTIVE_MANAGER_DATA:
            return { ...state, activeManagerList: data.payload[0] };

        case FAILED_GET_ALL_ACTIVE_MANAGER_DATA:
            return { ...state, activeManagerList: data.payload[0] };

        default:
            return state;
    }
};
