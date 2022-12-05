// import { createStore } from 'redux';
// // import reducer from './reducer';

// // // ==============================|| REDUX - MAIN STORE ||============================== //

// // const store = createStore(reducer);
// // const persister = 'Free';

// // export { store, persister };

// import { configureStore } from '@reduxjs/toolkit';

// //const store = createStore(rootReducer);
// import productSaga from './saga/productSaga';
// import createTaxSaga from './saga/masterSaga/TaxSaga';
// import createSagaMiddleware from 'redux-saga';
// import { wacherSaga } from './saga/rootSaga';
// import rootReducer from './reducers/rootReducer';
// import reducer from './reducer';

// const sagaMiddleware = createSagaMiddleware();
// const store = configureStore({
//     reducer: reducer,
//     middleware: () => [sagaMiddleware]
// });

// sagaMiddleware.run(wacherSaga);
// const persister = 'Free';
// export { store, persister };

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';

import { wacherSaga } from './saga/rootSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(wacherSaga);
const persister = 'Free';
export { store, persister };
