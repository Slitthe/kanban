import { createSlice } from '@reduxjs/toolkit';
import { Board } from '@/types/board';

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
        setSelectedSlice: (state: BoardsSlice, action) => {
            state.selectedBoard = action.payload;
        },
        resetSelectedSlice: (state: BoardsSlice) => {
            state.selectedBoard = null;
        },
        addBoard: (state: BoardsSlice, action: { payload: Board }) => {
            state.boards = [...state.boards, action.payload];
        },
        removeBoard: (state: BoardsSlice, action) => {
            const { id } = action.payload;
            state.boards = state.boards.filter(
                (board: Board) => board.id !== id
            );
        },
        resetBoards: (state: BoardsSlice, action) => {
            state.boards = [];
        },
    },
});

export const {
    setSelectedSlice,
    resetSelectedSlice,
    addBoard,
    removeBoard,
    resetBoards,
} = boardsSlice.actions;
export default boardsSlice.reducer;
