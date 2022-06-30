import CountryInfo from './CountryInfo';

function Countries(props) {
    let filtered = [];
    props.countries.forEach(country => {
      if(country.name.common.toLowerCase().includes(props.filter.toLowerCase()))
        filtered.push(country);        
    })

    if(filtered.length >= 10)
      return (<h3>Too many matches, specify another filter. ({filtered.length})</h3>)    
    else if(filtered.length > 1)
      return (
        <div>
          <ul>
            {filtered.map(c=>
                <li key=
                    {c.name.common}>{c.name.common}  
                    <button onClick={_=>props.setfilter(c.name.common)}>Show</button>
                </li>)}
          </ul>
        </div>    
    )
    else if(filtered.length === 1) {
      return <CountryInfo country={filtered[0]} />
    }
  }

export default Countries;