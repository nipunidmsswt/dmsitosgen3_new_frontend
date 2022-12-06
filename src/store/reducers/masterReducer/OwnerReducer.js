import {
    ADD_FAILED_OWNER_DATA,
    ADD_SUCCESS_OWNER_DATA,
    FAILED_GET_OWNER_DATA_BY_ID,
    FAILED_OWNER_LAST_MODIFIED_DATE,
    FAILED_OWNER_LIST_DATA,
    OWNER_CODE_DUPLICATE,
    SUCCESS_GET_OWNER_DATA_BY_ID,
    SUCCESS_OWNER_LAST_MODIFIED_DATE,
    SUCCESS_OWNER_LIST_DATA,
    UPDATE_FAILED_OWNER_DATA,
    UPDATE_SUCCESS_OWNER_DATA
} from '../../constant/master/OwnerConstant';

const initialState = {
    owner: null,
    ownerList: [],
    ownerToUpdate: null,
    errorMsg: null,
    duplicateOwner: null,
    lastModifiedDateTime: null
};

export const ownerDataReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_OWNER_DATA:
            console.warn('SUCCESS_OWNER_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, owner: data.payload[0] };

        case ADD_FAILED_OWNER_DATA:
            console.warn('FAILED_OWNER_DATA', action);
            console.log(data);
            return {
                ...state,
                OWNER: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_OWNER_DATA_BY_ID:
            console.warn('SUCCESS_GET_OWNER_DATA_BY_ID', action.payload);
            console.log('reucer log :' + data.payload[0]);
            return { ...state, ownerToUpdate: data.payload[0] };

        case FAILED_GET_OWNER_DATA_BY_ID:
            console.warn('FAILED_GET_OWNER_DATA_BY_ID', action);
            console.log(data);
            return {
                ...state,
                ownerToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_OWNER_DATA:
            return { ...state, owner: data.payload[0] };

        case UPDATE_FAILED_OWNER_DATA:
            return {
                ...state,
                owner: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_OWNER_LIST_DATA:
            return { ...state, ownerList: data };

        case FAILED_OWNER_LIST_DATA:
            return { ...state, ownerList: data };

        case OWNER_CODE_DUPLICATE:
            return { ...state, duplicateOwner: data };

        case SUCCESS_OWNER_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };
        case FAILED_OWNER_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data };

        // data.payload[0].dateTime.replace("T"," ")
        default:
            return state;
    }
};
