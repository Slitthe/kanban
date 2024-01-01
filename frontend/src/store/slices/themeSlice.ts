import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    mode: 'light' | 'dark';
}

const initialState: ThemeState = {
    mode: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state: ThemeState) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
            } else {
                state.mode = 'light';
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

const themeReducer = themeSlice.reducer;

export { themeReducer };
