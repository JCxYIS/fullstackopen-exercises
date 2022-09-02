import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService';

const initialState = {

}

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
        return action.payload
    }
  }
});

export const refreshBlogs = () =>{
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch(blogReducer.actions.setBlogs(data))
    }
}

export const {} = blogReducer.actions

export default blogReducer.reducer