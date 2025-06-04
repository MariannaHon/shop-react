import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { productsReducer } from './products/slice';
import { authReducer } from './auth/slice';
import { filtersReducer } from './filters/slice';
import { cartReducer } from './cart/slice';

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productByIdReducer } from './product/slice';
import { relatedProductsReducer } from './relatedProducts/slice';
import { popularProductsReducer } from './popularProducts/slice';

const AuthPersistConfig = {
    key: 'auth',
    storage,
};

const cartPersistConfig = {
    key: 'cart',
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(AuthPersistConfig, authReducer),
    products: productsReducer,
    productById: productByIdReducer,
    relatedProducts: relatedProductsReducer,
    popularProducts: popularProductsReducer,
    filters: filtersReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
