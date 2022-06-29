
const Phonebook = (props)=> {    
    let result = [];
    props.persons.forEach(p => {
      if(p.name.includes(props.filter))
        result.push(<p key={p.name}>{p.name} {p.number}</p>)
    });
    return result;
}

export default Phonebook