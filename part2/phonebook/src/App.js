import { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <h2>Add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} />
      </form>
      <h2>Numbers</h2>
      <div>
        <Filter setFilter={setFilter} />
        <Phonebook persons={persons} filter={filter}/>
      </div>
    </div>
  )
}

export default App