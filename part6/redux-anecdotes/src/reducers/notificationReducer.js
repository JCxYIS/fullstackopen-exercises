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

export const setNotif = (msg, secondsToHide) => {
    return async dispatch => {
      dispatch(showNotif(msg));
      await new Promise(resolve => setTimeout(resolve, secondsToHide * 1000));
      dispatch(hideNotif());
    }
  }

export default slice.reducer