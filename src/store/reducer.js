import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { taxReducer } from './reducers/masterReducer/TaxReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    taxReducer
});

export default reducer;
