import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../../types/board.ts';

interface BoardsSlice {
    boards: Board[];
    selectedBoard: Board | null;
}

const initialState: BoardsSlice = {
    boards: [],
    selectedBoard: null,
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setSelectedBoard: (state: BoardsSlice, action) => {
            state.selectedBoard = action.payload;
        },
        resetSelectedBoard: (state: BoardsSlice) => {
            state.selectedBoard = null;
        },
        addBoard: (state: BoardsSlice, action: { payload: Board }) => {
            state.boards = [...state.boards, action.payload];
        },
        removeBoard: (state: BoardsSlice, action: { payload: Board }) => {
            const { id } = action.payload;
            state.boards = state.boards.filter(
                (board: Board) => board.id !== id
            );
        },
        resetBoards: (state: BoardsSlice) => {
            state.boards = [];
        },
        setBoards: (state: BoardsSlice, action: { payload: Board[] }) => {
            state.boards = action.payload;
        },
    },
});

export const {
    setSelectedBoard,
    resetSelectedBoard,
    addBoard,
    setBoards,
    removeBoard,
    resetBoards,
} = boardsSlice.actions;

const boardsReducer = boardsSlice.reducer;
export { boardsReducer };
