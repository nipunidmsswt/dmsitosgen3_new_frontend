import { takeLatest } from 'redux-saga/effects';

import {
    saveTaxSaga,
    getTaxByIdSaga,
    getAllTaxSaga,
    updateTaxSaga,
    checkDupicateTaxCodeSaga,
    saveTaxGroupSaga,
    getAllTaxGroupSaga,
    getTaxGroupByIdSaga,
    updateTaxGroupSaga,
    checkDupicateTaxGroupCodeSaga,
    checkLatestTaxModifiedDateSaga,
    checkLatestTaxGrupModifiedDateSaga
} from './mastersaga/TaxSaga';
import {
    SAVE_TAX_DATA,
    GET_TAX_DATA_BY_ID,
    GET_ALL_TAX_DATA,
    UPDATE_TAX_DATA,
    CHECK_TAX_DUPLICATE,
    SAVE_TAX_GROUP_DATA,
    GET_ALL_TAX_GROUP_DATA,
    GET_TAX_GROUP_DATA_BY_ID,
    UPDATE_TAX_GROUP_DATA,
    CHECK_TAX_GROUP_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_TAX,
    GET_LAST_MODIFIED_DATE_TIME_TAX_GROUP
} from 'store/constant/master/TaxMasterConstant';

import {
    saveTourCategoryHandler,
    getAllTourCategorySaga,
    getTourCategoryByIdSaga,
    updateTourCategorySaga,
    checkDupicateTourCategotyCodeSaga,
    checkLeatestModifiedDateSaga
} from './mastersaga/TourCategorySaga';

import {
    CHECK_TOUR_CATEGORY_CODE_DUPLICATE,
    GET_ALL_TOUR_CATEGORY_DATA,
    GET_TOUR_CATEGORY_DATA_BY_ID,
    SAVE_TOUR_CATEGORY_DATA,
    UPDATE_TOUR_CATEGORY_DATA,
    GET_LAST_MODIFIED_DATE_TIME
} from 'store/constant/master/TourCategoryMasterConstant';

// import { getAllCurrenciesSaga } from '../saga/ApiServiceSaga/ApiServiceSaga';
// import { GET_ALL_CURRENCIES } from 'store/constant/apiServiceConstant/ApiServiceConstant';

import {
    SAVE_EXCHNAGE_RATE_TYPE_DATA,
    UPDATE_EXCHNAGE_RATE_TYPE_DATA,
    GET_ALL_EXCHNAGE_RATE_TYPE_DATA,
    GET_EXCHNAGE_RATE_TYPE_BY_ID,
    GET_LAST_MODIFIED_DATE_TIME_EXCHNAGE_RATE_TYPE
} from 'store/constant/master/ExchangeRateConstant';

import {
    saveExchangeRateTypeSaga,
    updateExchangeRateTypeSaga,
    getAllExchnageRateTypeDataSaga,
    getExchangeRateTypeByIdSaga,
    checkLatestCurrencyModifiedDateSaga
} from './mastersaga/ExchangeRateTypeSaga';

// import {
//     saveProductDataHandler,
//     getAllProductSaga,
//     getProductByIdSaga,
//     updateProductDataSaga,
//     checkProductLatestModifiedDateSaga,
//     checkDupicateProductCodeSaga
// } from './masterSaga/ProductDataSaga';
// import {
//     CHECK_PRODUCT_CODE_DUPLICATE,
//     GET_ALL_PRODUCT_DATA,
//     GET_PRODUCT_DATA_BY_ID,
//     GET_PRODUCT_LAST_MODIFIED_DATE_TIME,
//     SAVE_PRODUCT_DATA,
//     UPDATE_PRODUCT_DATA
// } from 'store/constant/master/ProductDataMasterConstant';

import {
    SAVE_LOCATION_DATA,
    GET_LOCATION_DATA_BY_ID,
    GET_ALL_LOCATION_DATA,
    UPDATE_LOCATION_DATA,
    CHECK_LOCATION_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_LOCATION
} from 'store/constant/master/LocationConstant';

import {
    CHECK_CODE_DUPLICATE,
    CHECK_CODE_TYPE_DUPLICATE,
    GET_ALL_CLUSTER_DATA,
    GET_ALL_CODE_AND_NAME_DATA,
    GET_CODE_LAST_MODIFIED_DATE_TIME,
    GET_CODE_NAME_DATA_BY_CODE,
    SAVE_CODE_AND_NAME_DATA,
    UPDATE_CODE_AND_NAME_DATA
} from 'store/constant/master/CodeAndNameConstant';

import {
    saveCodeAndNameDataHandler,
    getAllCodeAndNameSaga,
    getCodeAndNameByCodeSaga,
    updateCodeAndNameDataSaga,
    checkDupicateCodeSaga,
    checkDupicateCodeTypeSaga,
    checkCodeLatestModifiedDateSaga,
    getAllClusterTypeData
} from './mastersaga/CodeAndNameSaga';

import {
    CHECK_MANAGER_CODE_DUPLICATE,
    GET_ALL_ACTIVE_MANAGER_DATA,
    GET_ALL_MANAGER_DATA,
    GET_MANAGER_DETAILS_BY_CODE,
    GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    SAVE_MANAGER_DATA,
    UPDATE_MANAGER_DATA
} from 'store/constant/master/ManagerConstant';

import {
    saveManagerDataHandler,
    getAllManagerDataSaga,
    getManagerDetailsByCodeSaga,
    getManagerLatestModifiedDateSaga,
    checkManagerDupicateCodeSaga,
    updateManagerDataSaga,
    getAllActiveManagerDataSaga
} from './mastersaga/ManagerSaga';

import {
    saveLocationSaga,
    getAllLocatonSaga,
    getLocationByIdSaga,
    updateLocationSaga,
    checkDupicateLocationSaga,
    checkLatestLocationModifiedDateSaga
} from './mastersaga/LocationSaga';

import {
    SAVE_HOTEL_CATEGORY_DATA,
    GET_HOTEL_CATEGORY_DATA_BY_ID,
    GET_ALL_HOTEL_CATEGORY_DATA,
    UPDATE_HOTEL_CATEGORY_DATA,
    CHECK_HOTEL_CATEGORY_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_HOTEL_CATEGORY
} from 'store/constant/master/HotelCategoryConstant';

import {
    checkDupicateHotelCateogryCodeSaga,
    checkLatestHotelCateogryModifiedDateSaga,
    getAllHotelCateogrySaga,
    getHotelCateogryByIdSaga,
    saveHotelCateogrySaga,
    updateHotelCateogrySaga
} from './mastersaga/HotelCategorySaga';

// import {
//     SAVE_ROOM_RECREATION_DATA,
//     GET_ROOM_RECREATION_DATA_BY_ID,
//     GET_ALL_ROOM_RECREATION_DATA,
//     UPDATE_ROOM_RECREATION_DATA,
//     CHECK_ROOM_RECREATION_DUPLICATE,
//     GET_LAST_MODIFIED_DATE_TIME_ROOM_RECREATION
// } from 'store/constant/master/RoomRecreationConstant';

// import {
//     saveRoomRecreationSaga,
//     getAllRoomRecreationSaga,
//     getRoomRecreationByIdSaga,
//     updateRoomRecreationSaga,
//     checkDupicateRoomRecreationCodeSaga,
//     checkLatestRoomCreationModifiedDateSaga
// } from './masterSaga/RoomRecreationSaga';

import {
    saveManagingCompanySaga,
    getAllManagingCompanySaga,
    getManagingCompanyByIdSaga,
    updateManagingCompanySaga,
    checkDupicateManagingCompanyCodeSaga,
    checkLatestManagingCompanyModifiedDateSaga
} from './mastersaga/ManagingCompanySaga';

import {
    CHECK_MANAGING_COMAPANY_DUPLICATE,
    GET_ALL_MANAGING_COMAPANY_DATA,
    GET_LAST_MODIFIED_DATE_TIME_MANAGING_COMAPANY,
    GET_MANAGING_COMAPANY_DATA_BY_ID,
    SAVE_MANAGING_COMAPANY_DATA,
    UPDATE_MANAGING_COMAPANY_DATA
} from 'store/constant/master/ManagingCompanyConstant';

import {
    saveMarketDataHandler,
    getMarketLatestModifiedDateSaga,
    getAllMarketDataSaga,
    getMarketDetailsByCodeSaga,
    updateMarketDataSaga,
    checkMarketDupicateCodeSaga,
    getAllActiveMarketDataSaga
} from './mastersaga/MarketSaga';
import {
    CHECK_MARKET_CODE_DUPLICATE,
    GET_ALL_ACTIVE_MARKET_DATA,
    GET_ALL_MARKET_DATA,
    GET_MARKET_DETAILS_BY_CODE,
    GET_MARKET_LAST_MODIFIED_DATE_TIME,
    SAVE_MARKET_DATA,
    UPDATE_MARKET_DATA
} from 'store/constant/master/MarketConstant';

// import {
//     CHECK_SERVICEOFFERED_CODE_DUPLICATE,
//     GET_ALL_SERVICEOFFERED_DATA,
//     GET_SERVICEOFFERED_DATA_BY_ID,
//     GET_SERVICEOFFERED_LAST_MODIFIED_DATE_TIME,
//     SAVE_SERVICEOFFERED_DATA,
//     UPDATE_SERVICEOFFERED_DATA
// } from 'store/constant/master/ServiceOfferedConstant';
// import {
//     checkDupicateServiceOfferedCodeSaga,
//     checkServiceOfferedLatestModifiedDateSaga,
//     getAllServiceOfferedSaga,
//     getServiceOfferedByIdSaga,
//     saveServiceOffered,
//     updateServiceOfferedSaga
// } from './masterSaga/ServiceOfferedSaga';
import {
    CHECK_TOURTYPE_CODE_DUPLICATE,
    GET_ALL_TOURTYPE_DATA,
    GET_TOURTYPE_DATA_BY_ID,
    GET_TOURTYPE_LAST_MODIFIED_DATE_TIME,
    SAVE_TOURTYPE_DATA,
    UPDATE_TOURTYPE_DATA
} from 'store/constant/master/TourTypeConstant';
import {
    checkTourTypeLatestModifiedDateSaga,
    getAllTourTypeSaga,
    getTourTypeByIdSaga,
    saveTourType,
    updateTourTypeSaga
} from './mastersaga/TourTypeSaga';
import { checkDuplicateTourTypeCode } from 'store/actions/masterActions/TourTypeAction';
// import { checkDuplicateTourTypeCode, getAllTourTypeData } from '../actions/masterActions/TourTypeAction';
import {
    CHECK_OWNER_CODE_DUPLICATE,
    GET_ALL_OWNER_DATA,
    GET_OWNER_DATA_BY_ID,
    GET_OWNER_LAST_MODIFIED_DATE_TIME,
    SAVE_OWNER_DATA,
    UPDATE_OWNER_DATA
} from 'store/constant/master/OwnerConstant';
import {
    checkDupicateOwnerCodeSaga,
    checkOwnerLatestModifiedDateSaga,
    getAllOwnerSaga,
    getOwnerByIdSaga,
    saveOwner,
    updateOwnerSaga
} from './mastersaga/OwnerSaga';

import {
    CHECK_SEASON_DUPLICATE,
    GET_ALL_SEASON_DATA,
    GET_SEASON_DATA_BY_ID,
    GET_LAST_MODIFIED_DATE_TIME_SEASON,
    SAVE_SEASON_DATA,
    UPDATE_SEASON_DATA
} from 'store/constant/master/SeasonConstant';

import {
    saveSeasonSaga,
    checkLatestSeasonModifiedDateSaga,
    getSeasonByIdSaga,
    getAllSeasonSaga,
    updateSeasonSaga,
    checkDupicateSeasonSaga
} from './mastersaga/SeasonSaga';

import {
    GET_ALL_HOTEL_FACILITY_DATA,
    GET_HOTEL_FACILITY_DATA_BY_ID,
    GET_LAST_MODIFIED_DATE_TIME_HOTEL_FACILITY,
    SAVE_HOTEL_FACILITY_DATA,
    UPDATE_HOTEL_FACILITY_DATA,
    GET_ALL_HOTEL_FACILITY_TYPES_DATA
} from 'store/constant/master/HotelFacilityConstant';

import {
    saveHotelFacilitySaga,
    checkDupicateHotelFacilitySaga,
    getAllHotelFacilitySaga,
    getFacilityByIdSaga,
    updateHotelFacilitySaga,
    checkLatestHotelFacilityModifiedDateSaga,
    getAllHotelFacilityTypesSaga
} from './mastersaga/HotelFacilitySaga';

import {
    CHECK_MARKET_GROUP_CODE_DUPLICATE,
    GET_ALL_ACTIVE_MARKET_GROUP_DATA,
    GET_ALL_MARKET_GROUP_DATA,
    GET_ALL_MARKET_GROUP_GROUP_DATA,
    GET_MARKET_GROUP_DETAILS_BY_CODE,
    GET_MARKET_GROUP_LAST_MODIFIED_DATE_TIME,
    SAVE_MARKET_GROUP_DATA,
    UPDATE_MARKET_GROUP_DATA
} from 'store/constant/master/MarketGroupConstant';

import {
    checkMarketGroupDupicateCodeSaga,
    getAllMarketGroupDataSaga,
    getMarketGroupDetailsByCodeSaga,
    getMarketGroupLatestModifiedDateSaga,
    saveMarketGroupDataHandler,
    updateMarketGroupDataSaga
} from './mastersaga/MarketGroupSaga';
import {
    CHECK_HOTEL_BASIS_CODE_DUPLICATE,
    GET_ALL_HOTEL_BASIS,
    GET_HOTEL_BASIS_BY_ID,
    GET_HOTEL_BASIS_LAST_MODIFIED_DATE_TIME,
    SAVE_HOTEL_BASIS,
    UPDATE_HOTEL_BASIS
} from 'store/constant/master/HotelBasisConstant';
import {
    checkHotelBasisDupicateCodeSaga,
    getAllHotelBasisDataSaga,
    getHotelBasisByCodeSaga,
    getHotelBasisLatestModifiedDateSaga,
    saveHotelBasisDataHandler,
    updateHotelBasisDataSaga
} from './mastersaga/HotelBasisSaga';

import {
    checkRoomCategoryDupicateCodeSaga,
    getAllRoomCategoryDataSaga,
    getRoomCategoryByCodeSaga,
    getRoomCategoryLatestModifiedDateSaga,
    saveRoomCategoryDataHandler,
    updateRoomCategoryDataSaga
} from './mastersaga/RoomCategorySaga';

import {
    CHECK_ROOM_CATEGORY_CODE_DUPLICATE,
    GET_ALL_ROOM_CATEGORY,
    GET_ROOM_CATEGORY_BY_ID,
    GET_ROOM_CATEGORY_LAST_MODIFIED_DATE_TIME,
    SAVE_ROOM_CATEGORY,
    UPDATE_ROOM_CATEGORY
} from 'store/constant/master/RoomCategoryConstant';

export function* wacherSaga() {
    // tax setup
    yield takeLatest(SAVE_TAX_DATA, saveTaxSaga);
    yield takeLatest(GET_TAX_DATA_BY_ID, getTaxByIdSaga);
    yield takeLatest(GET_ALL_TAX_DATA, getAllTaxSaga);
    yield takeLatest(UPDATE_TAX_DATA, updateTaxSaga);
    yield takeLatest(CHECK_TAX_DUPLICATE, checkDupicateTaxCodeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_TAX, checkLatestTaxModifiedDateSaga);

    //tax group setup
    yield takeLatest(SAVE_TAX_GROUP_DATA, saveTaxGroupSaga);
    yield takeLatest(GET_ALL_TAX_GROUP_DATA, getAllTaxGroupSaga);
    yield takeLatest(GET_TAX_GROUP_DATA_BY_ID, getTaxGroupByIdSaga);
    yield takeLatest(UPDATE_TAX_GROUP_DATA, updateTaxGroupSaga);
    yield takeLatest(CHECK_TAX_GROUP_DUPLICATE, checkDupicateTaxGroupCodeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_TAX_GROUP, checkLatestTaxGrupModifiedDateSaga);

    // //tour category setup
    yield takeLatest(SAVE_TOUR_CATEGORY_DATA, saveTourCategoryHandler);
    yield takeLatest(GET_ALL_TOUR_CATEGORY_DATA, getAllTourCategorySaga);
    yield takeLatest(GET_TOUR_CATEGORY_DATA_BY_ID, getTourCategoryByIdSaga);
    yield takeLatest(UPDATE_TOUR_CATEGORY_DATA, updateTourCategorySaga);
    yield takeLatest(CHECK_TOUR_CATEGORY_CODE_DUPLICATE, checkDupicateTourCategotyCodeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME, checkLeatestModifiedDateSaga);

    // //currency
    // yield takeLatest(GET_ALL_CURRENCIES, getAllCurrenciesSaga);

    //exchange rate type
    yield takeLatest(SAVE_EXCHNAGE_RATE_TYPE_DATA, saveExchangeRateTypeSaga);
    yield takeLatest(GET_EXCHNAGE_RATE_TYPE_BY_ID, getExchangeRateTypeByIdSaga);
    yield takeLatest(GET_ALL_EXCHNAGE_RATE_TYPE_DATA, getAllExchnageRateTypeDataSaga);
    yield takeLatest(UPDATE_EXCHNAGE_RATE_TYPE_DATA, updateExchangeRateTypeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_EXCHNAGE_RATE_TYPE, checkLatestCurrencyModifiedDateSaga);

    // //product  setup

    // yield takeLatest(SAVE_PRODUCT_DATA, saveProductDataHandler);
    // yield takeLatest(GET_ALL_PRODUCT_DATA, getAllProductSaga);
    // yield takeLatest(GET_PRODUCT_DATA_BY_ID, getProductByIdSaga);
    // yield takeLatest(UPDATE_PRODUCT_DATA, updateProductDataSaga);
    // yield takeLatest(GET_PRODUCT_LAST_MODIFIED_DATE_TIME, checkProductLatestModifiedDateSaga);
    // yield takeLatest(CHECK_PRODUCT_CODE_DUPLICATE, checkDupicateProductCodeSaga);

    // //code&Name setup

    yield takeLatest(SAVE_CODE_AND_NAME_DATA, saveCodeAndNameDataHandler);
    yield takeLatest(GET_ALL_CODE_AND_NAME_DATA, getAllCodeAndNameSaga);
    yield takeLatest(GET_CODE_NAME_DATA_BY_CODE, getCodeAndNameByCodeSaga);
    yield takeLatest(UPDATE_CODE_AND_NAME_DATA, updateCodeAndNameDataSaga);
    yield takeLatest(CHECK_CODE_DUPLICATE, checkDupicateCodeSaga);
    yield takeLatest(CHECK_CODE_TYPE_DUPLICATE, checkDupicateCodeTypeSaga);
    yield takeLatest(GET_CODE_LAST_MODIFIED_DATE_TIME, checkCodeLatestModifiedDateSaga);

    // //location data
    yield takeLatest(SAVE_LOCATION_DATA, saveLocationSaga);
    yield takeLatest(GET_LOCATION_DATA_BY_ID, getLocationByIdSaga);
    yield takeLatest(GET_ALL_LOCATION_DATA, getAllLocatonSaga);
    yield takeLatest(UPDATE_LOCATION_DATA, updateLocationSaga);
    yield takeLatest(CHECK_LOCATION_DUPLICATE, checkDupicateLocationSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_LOCATION, checkLatestLocationModifiedDateSaga);

    // yield takeLatest(UPDATE_CODE_AND_NAME_DATA, updateCodeAndNameDataSaga);
    // yield takeLatest(CHECK_CODE_DUPLICATE, checkDupicateCodeSaga);
    // yield takeLatest(CHECK_CODE_TYPE_DUPLICATE, checkDupicateCodeTypeSaga);
    // yield takeLatest(GET_CODE_LAST_MODIFIED_DATE_TIME, checkCodeLatestModifiedDateSaga);

    //hotel category
    yield takeLatest(SAVE_HOTEL_CATEGORY_DATA, saveHotelCateogrySaga);
    yield takeLatest(GET_HOTEL_CATEGORY_DATA_BY_ID, getHotelCateogryByIdSaga);
    yield takeLatest(GET_ALL_HOTEL_CATEGORY_DATA, getAllHotelCateogrySaga);
    yield takeLatest(UPDATE_HOTEL_CATEGORY_DATA, updateHotelCateogrySaga);
    yield takeLatest(CHECK_HOTEL_CATEGORY_DUPLICATE, checkDupicateHotelCateogryCodeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_HOTEL_CATEGORY, checkLatestHotelCateogryModifiedDateSaga);

    // //room recreation
    // yield takeLatest(SAVE_ROOM_RECREATION_DATA, saveRoomRecreationSaga);
    // yield takeLatest(GET_ROOM_RECREATION_DATA_BY_ID, getRoomRecreationByIdSaga);
    // yield takeLatest(GET_ALL_ROOM_RECREATION_DATA, getAllRoomRecreationSaga);
    // yield takeLatest(UPDATE_ROOM_RECREATION_DATA, updateRoomRecreationSaga);
    // yield takeLatest(CHECK_ROOM_RECREATION_DUPLICATE, checkDupicateRoomRecreationCodeSaga);
    // yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_ROOM_RECREATION, checkLatestRoomCreationModifiedDateSaga);
    // yield takeLatest(GET_ALL_CLUSTER_DATA, getAllClusterTypeData);

    // //Manager

    yield takeLatest(SAVE_MANAGER_DATA, saveManagerDataHandler);
    yield takeLatest(GET_ALL_MANAGER_DATA, getAllManagerDataSaga);
    yield takeLatest(GET_MANAGER_DETAILS_BY_CODE, getManagerDetailsByCodeSaga);
    yield takeLatest(GET_MANAGER_LAST_MODIFIED_DATE_TIME, getManagerLatestModifiedDateSaga);
    yield takeLatest(CHECK_MANAGER_CODE_DUPLICATE, checkManagerDupicateCodeSaga);
    yield takeLatest(UPDATE_MANAGER_DATA, updateManagerDataSaga);
    yield takeLatest(GET_ALL_ACTIVE_MANAGER_DATA, getAllActiveManagerDataSaga);

    // //Market

    yield takeLatest(SAVE_MARKET_DATA, saveMarketDataHandler);
    yield takeLatest(GET_ALL_MARKET_DATA, getAllMarketDataSaga);
    yield takeLatest(GET_MARKET_DETAILS_BY_CODE, getMarketDetailsByCodeSaga);
    yield takeLatest(GET_MARKET_LAST_MODIFIED_DATE_TIME, getMarketLatestModifiedDateSaga);
    yield takeLatest(CHECK_MARKET_CODE_DUPLICATE, checkMarketDupicateCodeSaga);
    yield takeLatest(UPDATE_MARKET_DATA, updateMarketDataSaga);
    yield takeLatest(GET_ALL_ACTIVE_MARKET_DATA, getAllActiveMarketDataSaga);

    // //hotel service offered setup
    // yield takeLatest(SAVE_SERVICEOFFERED_DATA, saveServiceOffered);
    // yield takeLatest(GET_ALL_SERVICEOFFERED_DATA, getAllServiceOfferedSaga);
    // yield takeLatest(GET_SERVICEOFFERED_DATA_BY_ID, getServiceOfferedByIdSaga);
    // yield takeLatest(UPDATE_SERVICEOFFERED_DATA, updateServiceOfferedSaga);
    // yield takeLatest(GET_SERVICEOFFERED_LAST_MODIFIED_DATE_TIME, checkServiceOfferedLatestModifiedDateSaga);
    // yield takeLatest(CHECK_SERVICEOFFERED_CODE_DUPLICATE, checkDupicateServiceOfferedCodeSaga);

    //tour type setup
    yield takeLatest(SAVE_TOURTYPE_DATA, saveTourType);
    yield takeLatest(GET_ALL_TOURTYPE_DATA, getAllTourTypeSaga);
    yield takeLatest(GET_TOURTYPE_DATA_BY_ID, getTourTypeByIdSaga);
    yield takeLatest(UPDATE_TOURTYPE_DATA, updateTourTypeSaga);
    yield takeLatest(GET_TOURTYPE_LAST_MODIFIED_DATE_TIME, checkTourTypeLatestModifiedDateSaga);
    yield takeLatest(CHECK_TOURTYPE_CODE_DUPLICATE, checkDuplicateTourTypeCode);

    // // Market Group

    yield takeLatest(SAVE_MARKET_GROUP_DATA, saveMarketGroupDataHandler);
    yield takeLatest(GET_ALL_MARKET_GROUP_DATA, getAllMarketGroupDataSaga);
    yield takeLatest(GET_MARKET_GROUP_DETAILS_BY_CODE, getMarketGroupDetailsByCodeSaga);
    yield takeLatest(GET_MARKET_GROUP_LAST_MODIFIED_DATE_TIME, getMarketGroupLatestModifiedDateSaga);
    yield takeLatest(CHECK_MARKET_GROUP_CODE_DUPLICATE, checkMarketGroupDupicateCodeSaga);
    yield takeLatest(UPDATE_MARKET_GROUP_DATA, updateMarketGroupDataSaga);
    yield takeLatest(GET_ALL_ACTIVE_MARKET_GROUP_DATA, getAllMarketGroupDataSaga);

    //managing company
    yield takeLatest(SAVE_MANAGING_COMAPANY_DATA, saveManagingCompanySaga);
    yield takeLatest(GET_MANAGING_COMAPANY_DATA_BY_ID, getManagingCompanyByIdSaga);
    yield takeLatest(GET_ALL_MANAGING_COMAPANY_DATA, getAllManagingCompanySaga);
    yield takeLatest(UPDATE_MANAGING_COMAPANY_DATA, updateManagingCompanySaga);
    yield takeLatest(CHECK_MANAGING_COMAPANY_DUPLICATE, checkDupicateManagingCompanyCodeSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_MANAGING_COMAPANY, checkLatestManagingCompanyModifiedDateSaga);

    // //owner setup
    yield takeLatest(SAVE_OWNER_DATA, saveOwner);
    yield takeLatest(GET_ALL_OWNER_DATA, getAllOwnerSaga);
    yield takeLatest(GET_OWNER_DATA_BY_ID, getOwnerByIdSaga);
    yield takeLatest(UPDATE_OWNER_DATA, updateOwnerSaga);
    yield takeLatest(GET_OWNER_LAST_MODIFIED_DATE_TIME, checkOwnerLatestModifiedDateSaga);
    yield takeLatest(CHECK_OWNER_CODE_DUPLICATE, checkDupicateOwnerCodeSaga);
    // //season data
    yield takeLatest(SAVE_SEASON_DATA, saveSeasonSaga);
    yield takeLatest(GET_SEASON_DATA_BY_ID, getSeasonByIdSaga);
    yield takeLatest(GET_ALL_SEASON_DATA, getAllSeasonSaga);
    yield takeLatest(UPDATE_SEASON_DATA, updateSeasonSaga);
    yield takeLatest(CHECK_SEASON_DUPLICATE, checkDupicateSeasonSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_SEASON, checkLatestSeasonModifiedDateSaga);

    // //hotel facility data
    yield takeLatest(SAVE_HOTEL_FACILITY_DATA, saveHotelFacilitySaga);
    yield takeLatest(GET_HOTEL_FACILITY_DATA_BY_ID, getFacilityByIdSaga);
    yield takeLatest(GET_ALL_HOTEL_FACILITY_DATA, getAllHotelFacilitySaga);
    yield takeLatest(UPDATE_HOTEL_FACILITY_DATA, updateHotelFacilitySaga);
    yield takeLatest(CHECK_HOTEL_CATEGORY_DUPLICATE, checkDupicateHotelFacilitySaga);

    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_HOTEL_FACILITY, checkLatestHotelFacilityModifiedDateSaga);

    //hotel facility types
    yield takeLatest(GET_ALL_HOTEL_FACILITY_TYPES_DATA, getAllHotelFacilityTypesSaga);

    // //Hotel Basis

    yield takeLatest(SAVE_HOTEL_BASIS, saveHotelBasisDataHandler);
    yield takeLatest(GET_ALL_HOTEL_BASIS, getAllHotelBasisDataSaga);
    yield takeLatest(GET_HOTEL_BASIS_BY_ID, getHotelBasisByCodeSaga);

    yield takeLatest(GET_HOTEL_BASIS_LAST_MODIFIED_DATE_TIME, getHotelBasisLatestModifiedDateSaga);
    yield takeLatest(CHECK_HOTEL_BASIS_CODE_DUPLICATE, checkHotelBasisDupicateCodeSaga);
    yield takeLatest(UPDATE_HOTEL_BASIS, updateHotelBasisDataSaga);

    // //Room Category

    yield takeLatest(SAVE_ROOM_CATEGORY, saveRoomCategoryDataHandler);
    yield takeLatest(GET_ALL_ROOM_CATEGORY, getAllRoomCategoryDataSaga);
    yield takeLatest(GET_ROOM_CATEGORY_BY_ID, getRoomCategoryByCodeSaga);

    yield takeLatest(GET_ROOM_CATEGORY_LAST_MODIFIED_DATE_TIME, getRoomCategoryLatestModifiedDateSaga);
    yield takeLatest(CHECK_ROOM_CATEGORY_CODE_DUPLICATE, checkRoomCategoryDupicateCodeSaga);
    yield takeLatest(UPDATE_ROOM_CATEGORY, updateRoomCategoryDataSaga);
}
