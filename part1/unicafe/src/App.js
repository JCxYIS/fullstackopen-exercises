import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const score = good - bad;
  const total = good+neutral+bad;

  /* -------------------------------------------------------------------------- */

  const Buttons = () => {
    return (
      <div>
        
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
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

export default App