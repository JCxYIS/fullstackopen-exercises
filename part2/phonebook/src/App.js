import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebookService'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')

  // refresh phonebook
  function updatePhonebook() {
    phonebookService.getAll()
    .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
    })
  }

  useEffect(() => {
    console.log('effect')
    updatePhonebook();
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <h2>Add a new</h2>
        <PersonForm persons={persons} update={updatePhonebook} />
      </form>
      <h2>Numbers</h2>
      <div>
        <Filter setFilter={setFilter} />
        <Phonebook persons={persons} filter={filter} update={updatePhonebook} />
      </div>
    </div>
  )
}

export default App