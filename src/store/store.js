import {createStore, applyMiddleware, compose} from "redux";
import {persistStore} from "redux-persist";
import rootReducer from './reducers';
import thunk from "redux-thunk";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const middlewares = [thunk];

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
export const persistor = persistStore(store);