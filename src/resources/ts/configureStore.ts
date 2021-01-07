import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import { ActionType } from '@/enums';
import { requestMiddleware } from '@/middlewares';
import * as reducers from '@/reducers';

const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionType[action.type] ? ({
    type: ActionType[action.type],
    payload: action.payload,
}) : action;

const persistConfig = {
    key: 'root',
    storage,
};

export default () => {
    const logger = createLogger({ actionTransformer: actionTypeEnumToString });
    const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });
    const enhancers = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(thunk, logger, requestMiddleware)) :
        composeEnhancers(applyMiddleware(thunk, requestMiddleware));

    const rootReducer = combineReducers(reducers);
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer, enhancers);
    const persistor = persistStore(store);

    return {
        store,
        persistor
    }
}
