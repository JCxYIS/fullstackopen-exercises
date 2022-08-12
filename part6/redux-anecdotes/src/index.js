import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import reducer  from './reducers/anecdoteReducer'
import notifReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer:{
    anecdotes: reducer,
    notification: notifReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
