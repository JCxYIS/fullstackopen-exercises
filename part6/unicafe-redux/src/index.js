import React from 'react'
import ReactDOM from 'react-dom/client'


import { useState } from 'react'
import counterReducer from './reducers/counterReducer';
import { createStore } from 'redux'

// redux state
const counterStore = createStore(counterReducer)

const App = () => {

  counterStore.subscribe(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  })
  
  // getter
  const good = counterStore.getState().good
  const bad  = counterStore.getState().bad
  const neutral = counterStore.getState().ok
  const score = good - bad;
  const total = good+neutral+bad;

  /* -------------------------------------------------------------------------- */

  const Buttons = () => {
    return (
      <div>        
        <button onClick={() => counterStore.dispatch({type: 'GOOD'})}>Good</button>
        <button onClick={() => counterStore.dispatch({type: 'OK'})  }>Neutral</button>
        <button onClick={() => counterStore.dispatch({type: 'BAD'}) }>Bad</button>
      </div>
    );
  };

  const Statistics = (props) => {
    if(total === 0) 
      return (
        <div>
          <p>No feedback given.</p>
        </div>
      )
    else
      return(
        <div>
          <table><tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={score / total} />
            <StatisticLine text="Positive" value={good / total * 100 + "%"} />            
          </tbody></table>
        </div>
      );
  };

  const StatisticLine = (props) => {
    return (
      <tr>
        <th>{props.text}</th>
        <th>{props.value}</th>
      </tr>
    );
  };

  /* -------------------------------------------------------------------------- */

  return (    
    <div>
      <h1>Give Feedback</h1>
      <Buttons />
      <h1>Statistics</h1>  
      <Statistics />
    </div>
  )
}

const renderApp = ()=>{
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

renderApp()
counterStore.subscribe(renderApp)
