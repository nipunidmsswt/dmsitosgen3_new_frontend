import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { taxReducer } from './reducers/masterReducer/TaxReducer';
import { taxGroupReducer } from './reducers/masterReducer/TaxGroupReducer';
import { tourCategoryReducer } from './reducers/masterReducer/TourCategoryReducer';
import { exchangeRateTypesReducer } from './reducers/masterReducer/ExchangeRateTypeReducer';
import { productDataReducer } from './reducers/masterReducer/ProductDataReducer';
import { codeAndNameReducer } from './reducers/masterReducer/CodeAndNameReducer';
import { locationReducer } from './reducers/masterReducer/LocationReducer';
import { hotelCategoryReducer } from './reducers/masterReducer/HotelCategoryReducer';
import { roomRecreationReducer } from './reducers/masterReducer/RoomRecreationReducer';
import { managerReducer } from './reducers/masterReducer/ManagerReducer';
import { ManagingCompanyReducer } from './reducers/masterReducer/ManagingCompanyReducer';
import { marketGroupReducer } from './reducers/masterReducer/MarketGroupReducer';
import { serviceOfferedDataReducer } from './reducers/masterReducer/ServiceOfferedReducer';
import { marketReducer } from './reducers/masterReducer/MarketReducer';
import { tourTypeDataReducer } from './reducers/masterReducer/TourTypeReducer';
import { ownerDataReducer } from './reducers/masterReducer/OwnerReducer';
import { seasonReducer } from './reducers/masterReducer/SeasonReducer';
import { hotelFacilityReducer } from './reducers/masterReducer/HotelFacilityReducer';
import { hotelBasisReducer } from './reducers/masterReducer/HotelBasisReducer';
import { roomCategoryReducer } from './reducers/masterReducer/RoomCategoryReducer';
import { expenseTypesReducer } from './reducers/masterReducer/ExpenseTypesReducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    taxReducer,
    taxGroupReducer,
    tourCategoryReducer,
    // apiServiceReducer,
    exchangeRateTypesReducer,
    productDataReducer,
    codeAndNameReducer,
    locationReducer,
    hotelCategoryReducer,
    roomRecreationReducer,
    managerReducer,
    ManagingCompanyReducer,
    marketReducer,
    serviceOfferedDataReducer,
    tourTypeDataReducer,
    ownerDataReducer,
    seasonReducer,
    hotelFacilityReducer,
    marketGroupReducer,
    hotelBasisReducer,
    roomCategoryReducer,
    expenseTypesReducer
});

export default reducer;
