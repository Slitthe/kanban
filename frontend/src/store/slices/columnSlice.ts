import { createSlice } from '@reduxjs/toolkit';
import { Column } from '../../types/column.ts';

interface ColumnsSLice {
    columns: Column[];
}

const initialState: ColumnsSLice = {
    columns: [],
};

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state: ColumnsSLice, action: { payload: Column }) => {
            state.columns = [...state.columns, action.payload];
        },
        removeColumn: (state: ColumnsSLice, action: { payload: Column }) => {
            const { id } = action.payload;
            state.columns = state.columns.filter(
                (column: Column) => column.id !== id
            );
        },
        resetColumns: (state: ColumnsSLice) => {
            state.columns = [];
        },
        setColumns: (state: ColumnsSLice, action: { payload: Column[] }) => {
            state.columns = action.payload;
        },
    },
});

export const { addColumn, removeColumn, resetColumns, setColumns } =
    columnsSlice.actions;

const columnsReducer = columnsSlice.reducer;

export { columnsReducer };
