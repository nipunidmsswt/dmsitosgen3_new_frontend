import {
    ADD_SUCCESS_DEPARTMENT_DESIGNATION,
    ADD_FAILED_DEPARTMENT_DESIGNATION,
    FAILED_GET_DEPARTMENT_DESIGNATION_BY_ID,
    SUCCESS_GET_DEPARTMENT_DESIGNATION_BY_ID,
    UPDATE_FAILED_DEPARTMENT_DESIGNATION,
    SUCCESS_DEPARTMENT_DESIGNATION_LAST_MODIFIED_DATE,
    FAILED_DEPARTMENT_DESIGNATION_LAST_MODIFIED_DATE,
    UPDATE_SUCCESS_DEPARTMENT_DESIGNATION,
    SUCCESS_DEPARTMENT_DESIGNATION_LIST_DATA,
    FAILED_DEPARTMENT_DESIGNATION_LIST_DATA,
    DEPARTMENT_DESIGNATION_CODE_DUPLICATE
} from '../../constant/master/DepartmentDesignationConstant';

const initialState = {
    departmentDesignation: null,
    departmentDesignationList: [],
    departmentDesignationToUpdate: null,
    errorMsg: null,
    duplicateDepartmentDesignation: null,
    lastModifiedDateTime: null
};

export const departmentDesignationReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_DEPARTMENT_DESIGNATION:
            return { ...state, departmentDesignation: data.payload[0] };

        case ADD_FAILED_DEPARTMENT_DESIGNATION:
            return {
                ...state,
                departmentDesignation: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_DEPARTMENT_DESIGNATION_BY_ID:
            return { ...state, departmentDesignationToUpdate: data.payload[0] };

        case FAILED_GET_DEPARTMENT_DESIGNATION_BY_ID:
            return {
                ...state,
                departmentDesignationToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_DEPARTMENT_DESIGNATION:
            return { ...state, departmentDesignation: data.payload[0] };

        case UPDATE_FAILED_DEPARTMENT_DESIGNATION:
            return {
                ...state,
                departmentDesignation: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_DEPARTMENT_DESIGNATION_LIST_DATA:
            return { ...state, departmentDesignationList: data };

        case FAILED_DEPARTMENT_DESIGNATION_LIST_DATA:
            return { ...state, departmentDesignationList: data };

        case SUCCESS_DEPARTMENT_DESIGNATION_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_DEPARTMENT_DESIGNATION_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data };

        case DEPARTMENT_DESIGNATION_CODE_DUPLICATE:
            return { ...state, duplicateDepartmentDesignation: data };
        default:
            return state;
    }
};
