// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
      <p>Find Countries <input onChange={event=>setQuery(event.target.value)} /></p>
      <Countries countries={countries} filter={query} setfilter={setQuery} />
    </div>    
  );
}

export default App;
