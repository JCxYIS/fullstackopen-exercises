import { useState } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 


  const [filter, setFilter] = useState('')


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