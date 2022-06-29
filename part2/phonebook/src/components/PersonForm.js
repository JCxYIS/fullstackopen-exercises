import { useState } from 'react'

const PersonForm = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function addNameButtonClicked(event) {
        event.preventDefault()
    
        // let newName = event.target.form[0].value;
        if(props.persons.find(p => p.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return;    
        }
    
        props.setPersons(props.persons.concat({ name: newName, number: newNumber }))
      }

    return (
        <div>
            <div>
                name: <input onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                number: <input onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit" onClick={addNameButtonClicked}>add</button>
            </div>
        </div>
    );
}

export default PersonForm