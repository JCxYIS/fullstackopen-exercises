import { createSlice } from "@reduxjs/toolkit";
import accountService from "../services/accountService";
import cookie from 'react-cookies'

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
      cookie.remove('X-Access-Token')
      return null
    }
  }
})

export const doSignIn = (loginFormJson) => {
  return async dispatch => {
    const token = await accountService.login(loginFormJson)
    //console.log(response)
    dispatch(userReducer.actions.setUserObject({
      token: token,
      username: loginFormJson.username
    }))
  }
}

export const { doSignOut } = userReducer.actions
export default userReducer.reducer