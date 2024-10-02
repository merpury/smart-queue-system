import { configureStore } from "@reduxjs/toolkit";
import menuSlice from './slices/counterSlice'
import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['menu']
}

const reducer = combineReducers({
    menu: menuSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if you're sure about your state
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;