import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserObject(state, action) {      
      return {
        token: action.payload.token,
        username: action.payload.username
      }
    },
    doSignOut(state, action) {
      return null
    }
  }
})

export const doSignIn = (loginFormJson) => {
  return async dispatch => {
    const response = await axios.post("/api/users/login", loginFormJson)
    //console.log(response)
    dispatch(setUserObject({
      token: response.data.data,
      username: loginFormJson.username
    }))
  }
}

export const { setUserObject, doSignOut } = userReducer.actions
export default userReducer.reducer