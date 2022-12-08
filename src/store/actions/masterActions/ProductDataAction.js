import {
    SAVE_PRODUCT_DATA,
    GET_ALL_PRODUCT_DATA,
    GET_PRODUCT_DATA_BY_ID,
    UPDATE_PRODUCT_DATA,
    GET_PRODUCT_LAST_MODIFIED_DATE_TIME,
    CHECK_PRODUCT_CODE_DUPLICATE
} from '../../constant/master/ProductDataMasterConstant';

export const saveProductData = (data) => {
    return {
        type: SAVE_PRODUCT_DATA,
        data
    };
};

export const getAllProductData = () => {
    return {
        type: GET_ALL_PRODUCT_DATA
    };
};

export const getProductDataById = (id) => {
    return {
        type: GET_PRODUCT_DATA_BY_ID,
        data: { id }
    };
};

export const updateProductData = (data) => {
    return {
        type: UPDATE_PRODUCT_DATA,
        data
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_PRODUCT_LAST_MODIFIED_DATE_TIME
    };
};

export const checkDuplicateProductCodee = (productCode) => {
    console.log('product code:' + productCode);
    return {
        type: CHECK_PRODUCT_CODE_DUPLICATE,
        data: { productCode }
    };
};
