import {
    ADD_FAILED_PRODUCT_DATA,
    ADD_SUCCESS_PRODUCT_DATA,
    FAILED_GET_PRODUCT_DATA_BY_ID,
    FAILED_PRODUCT_LAST_MODIFIED_DATE,
    FAILED_PRODUCT_LIST_DATA,
    PRODUCT_CODE_DUPLICATE,
    SUCCESS_GET_PRODUCT_DATA_BY_ID,
    SUCCESS_PRODUCT_LAST_MODIFIED_DATE,
    SUCCESS_PRODUCT_LIST_DATA,
    UPDATE_FAILED_PRODUCT_DATA,
    UPDATE_SUCCESS_PRODUCT_DATA
} from '../../constant/master/ProductDataMasterConstant';

const initialState = {
    product: null,
    products: [],
    productToUpdate: null,
    errorMsg: null,
    duplicateProduct: null,
    lastModifiedDateTime: null
};

export const productDataReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_PRODUCT_DATA:
            console.warn('SUCCESS_TOUR_CATEGORY_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, product: data.payload[0] };

        case ADD_FAILED_PRODUCT_DATA:
            console.warn('FAILED_TOUR_CATEGORY_DATA', action);
            console.log(data);
            return {
                ...state,
                product: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_PRODUCT_DATA_BY_ID:
            console.warn('UCCESS_GET_PRODUCT_DATA_BY_ID', action.payload);
            // console.log(data.payload[0]);
            return { ...state, productToUpdate: data.payload[0] };

        case FAILED_GET_PRODUCT_DATA_BY_ID:
            console.warn('FAILED_GET_PRODUCT_DATA_BY_ID', action);
            console.log(data);
            return {
                ...state,
                productToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_PRODUCT_DATA:
            return { ...state, product: data.payload[0] };

        case UPDATE_FAILED_PRODUCT_DATA:
            return {
                ...state,
                product: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_PRODUCT_LIST_DATA:
            return { ...state, products: data };

        case FAILED_PRODUCT_LIST_DATA:
            return { ...state, products: data };

        case PRODUCT_CODE_DUPLICATE:
            return { ...state, duplicateProduct: data };

        case SUCCESS_PRODUCT_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };
        case FAILED_PRODUCT_LAST_MODIFIED_DATE:
            return { ...state, lastModifiedDateTime: data };

        // data.payload[0].dateTime.replace("T"," ")
        default:
            return state;
    }
};
