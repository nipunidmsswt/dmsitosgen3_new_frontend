import {
    ADD_SUCCESS_COMPANY_PROFILE,
    ADD_FAILED_COMPANY_PROFILE,
    SUCCESS_COMPANY_PROFILE_LAST_MODIFIED_DATE,
    FAILED_GET_COMPANY_PROFILE_BY_ID,
    SUCCESS_GET_COMPANY_PROFILE_BY_ID,
    UPDATE_FAILED_COMPANY_PROFILE,
    FAILED_COMPANY_PROFILE_LAST_MODIFIED_DATE,
    UPDATE_SUCCESS_COMPANY_PROFILE,
    SUCCESS_COMPANY_PROFILE_LIST_DATA,
    FAILED_COMPANY_PROFILE_LIST_DATA
} from '../../constant/master/CompanyProfilrConstant';

const initialState = {
    companyProfile: null,
    companyProfileList: [],
    companyProfileToUpdate: null,
    errorMsg: null,
    duplicatecompanyProfileGroup: null,
    lastModifiedDateTime: null
};

export const companyProfileReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_COMPANY_PROFILE:
            console.log('ADD_SUCCESS_COMPANY_PROFILE');
            console.log(data);
            return { ...state, companyProfile: data };

        case ADD_FAILED_COMPANY_PROFILE:
            return {
                ...state,
                companyProfile: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_COMPANY_PROFILE_BY_ID:
            console.log(data.payload[0].body.payload[0]?.companyProfile);
            return { ...state, companyProfileToUpdate: data.payload[0].body.payload[0]?.companyProfile };

        case FAILED_GET_COMPANY_PROFILE_BY_ID:
            return {
                ...state,
                companyProfileToUpdate: null,
                errorMsg: data ? data.payload[0].body.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_COMPANY_PROFILE:
            return { ...state, companyProfile: data.payload[0] };

        case UPDATE_FAILED_COMPANY_PROFILE:
            return {
                ...state,
                companyProfile: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_COMPANY_PROFILE_LIST_DATA:
            return { ...state, companyProfileList: data };

        case FAILED_COMPANY_PROFILE_LIST_DATA:
            return { ...state, companyProfileList: data };

        case SUCCESS_COMPANY_PROFILE_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_COMPANY_PROFILE_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data };

        default:
            return state;
    }
};
