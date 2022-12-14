import {
    ADD_FAILED_CODE_AND_NAME_DATA,
    ADD_SUCCESS_CODE_AND_NAME_DATA,
    CODE_DUPLICATE,
    CODE_TYPE_DUPLICATE,
    FAILED_ALL_CLUSTER_TYPE_DATA,
    FAILED_ALL_CODE_AND_NAME_DATA,
    FAILED_CODE_LAST_MODIFIED_DATE,
    FAILED_GET_CODE_NAME_DATA_BY_CODE,
    SUCCESS_ALL_CLUSTER_TYPE_DATA,
    SUCCESS_ALL_CODE_AND_NAME_DATA,
    SUCCESS_CODE_LAST_MODIFIED_DATE,
    SUCCESS_GET_CODE_NAME_DATA_BY_CODE,
    UPDATE_FAILED_CODE_AND_NAME_DATA,
    UPDATE_SUCCESS_CODE_AND_NAME_DATA
} from '../../constant/master/CodeAndNameConstant';

const initialState = {
    codeAndName: null,
    codeAndNameList: [],
    codeToUpdate: null,
    errorMsg: null,
    duplicateCodeType: null,
    duplicateCode: null,
    lastModifiedDateTime: null,
    cluterTypesDetails: []
};

export const codeAndNameReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_CODE_AND_NAME_DATA:
            console.warn('ADD_SUCCESS_CODE_AND_NAME_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, codeAndName: data.payload[0] };

        case ADD_FAILED_CODE_AND_NAME_DATA:
            console.warn('ADD_FAILED_CODE_AND_NAME_DATA', action);
            console.log(data);
            return {
                ...state,
                codeAndName: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_CODE_NAME_DATA_BY_CODE:
            console.warn('SUCCESS_GET_CODE_NAME_DATA_BY_CODE', data.payload[0]);
            return { ...state, codeToUpdate: data.payload[0] };

        case FAILED_GET_CODE_NAME_DATA_BY_CODE:
            return {
                ...state,
                codeToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_CODE_AND_NAME_DATA:
            return { ...state, codeAndName: data.payload[0] };

        case UPDATE_FAILED_CODE_AND_NAME_DATA:
            return {
                ...state,
                codeAndName: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_ALL_CODE_AND_NAME_DATA:
            return { ...state, codeAndNameList: data };

        case FAILED_ALL_CODE_AND_NAME_DATA:
            return { ...state, codeAndNameList: data };

        case CODE_TYPE_DUPLICATE:
            return { ...state, duplicateCodeType: data };

        case CODE_DUPLICATE:
            return { ...state, duplicateCode: data };

        case SUCCESS_CODE_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_CODE_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data };

        case SUCCESS_ALL_CLUSTER_TYPE_DATA:
            console.log(data.payload[0][0]);
            return { ...state, cluterTypesDetails: data.payload[0][0] };

        case FAILED_ALL_CLUSTER_TYPE_DATA:
            return { ...state, cluterTypesDetails: data.payload[0][0] };

        default:
            return state;
    }
};
