import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebookService'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const setMessage = {
    error: (msg)=>setErrorMessage(msg),
    success: (msg)=>setSuccessMessage(msg)
  }

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
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      <form>
        <h2>Add a new</h2>
        <PersonForm persons={persons} update={updatePhonebook} setMessage={setMessage} />
      </form>
      <h2>Numbers</h2>
      <div>
        <Filter setFilter={setFilter} />
        <Phonebook persons={persons} filter={filter} update={updatePhonebook} setMessage={setMessage} />
      </div>
    </div>
  )
}

export default App