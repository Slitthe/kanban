import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { boardsReducer } from './slices/boardSlice.ts';
import { columnsReducer } from './slices/columnSlice.ts';
import { themeReducer } from './slices/themeSlice.ts';

const rootReducer = combineReducers({
    boards: boardsReducer,
    columns: columnsReducer,
    theme: themeReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;

export default store;
