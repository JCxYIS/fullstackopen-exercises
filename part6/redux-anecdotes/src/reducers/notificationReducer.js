import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotif(state, action) {
            return action.payload;       
        },
        hideNotif(state, action) {
            return null;
        }
    }
})

export const { showNotif, hideNotif } = slice.actions;

export default slice.reducer