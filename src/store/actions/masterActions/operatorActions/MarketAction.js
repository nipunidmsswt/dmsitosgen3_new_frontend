import {
    CHECK_MARKET_CODE_DUPLICATE,
    GET_ALL_ACTIVE_MARKET_DATA,
    GET_ALL_MARKET_DATA,
    GET_MARKET_DETAILS_BY_CODE,
    GET_MARKET_LAST_MODIFIED_DATE_TIME,
    SAVE_MARKET_DATA,
    UPDATE_MARKET_DATA
} from '../../../constant/master/MarketConstant';

export const saveMarketData = (data) => {
    console.log('saveManagerData action s called', data);
    return {
        type: SAVE_MARKET_DATA,
        data
    };
};
export const getAllMarketData = () => {
    return {
        type: GET_ALL_MARKET_DATA
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_MARKET_LAST_MODIFIED_DATE_TIME
    };
};

export const getMarketDetailsByCode = (id) => {
    return {
        type: GET_MARKET_DETAILS_BY_CODE,
        data: { id }
    };
};

export const updateMarketData = (data) => {
    return {
        type: UPDATE_MARKET_DATA,
        data
    };
};

export const checkDuplicateMarketsCode = (data) => {
    return {
        type: CHECK_MARKET_CODE_DUPLICATE,
        data: data
    };
};

export const getAllActiveMarketData = () => {
    return {
        type: GET_ALL_ACTIVE_MARKET_DATA
    };
};
