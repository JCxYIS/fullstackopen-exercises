import phonebookService from "../services/phonebookService";
import App from "../App";

const Phonebook = (props) => {
  // delete person
  const deletePerson = (name, id) => {
    // prompt user to confirm
    if(!window.confirm(`Delete ${name}?`)) 
      return;

    // do delete
    phonebookService
      .deleteObj(id)
      .then(_=>{
        props.update()
        props.setMessage.success(`${name} has been deleted`)
      })
      .catch(error => {
        // console.log(error);
        props.setMessage.error('Oops, '+error.message)
      })
  }

  // render result  
  let result = [];

  props.persons.forEach(p => {
    if (p.name.includes(props.filter))
      result.push(
        <div key={p.id}>
          {p.name} {p.number} 
          <button onClick={() => deletePerson(p.name, p.id)}>delete</button>
        </div>
      )
  });
  return result;
}

export default Phonebook