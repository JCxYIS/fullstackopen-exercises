import { useState } from 'react'
import phonebookService from '../services/phonebookService'

const PersonForm = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function addNameButtonClicked(event) {
        event.preventDefault()

        // let newName = event.target.form[0].value;
        let newObject = { name: newName, number: newNumber }
        
        // check duplicate name
        let dulpId = props.persons.findIndex(p => p.name === newName)
        if (dulpId !== -1) {
            if(window.confirm(`${newName} is already added to phonebook. Replace with the new one?`)) {
                // update
                phonebookService
                    .update(props.persons[dulpId].id, newObject)
                    .then(_ => props.update())
            }
        }
        else {
            // create
            phonebookService
                .create(newObject)
                .then(_=>props.update())
        }
        
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