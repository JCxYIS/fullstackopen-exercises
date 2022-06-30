
function CountryInfo({ country }) {
	let lang = [];
	for (const [key, value] of Object.entries(country.languages)) {
		// console.log(key, value);
		lang.push(value);
	}

	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>Capital: {country.capital}</div>
			<div>Area: {country.area}</div>
			<div>Population: {country.population}</div>
			<div>Languages: {lang.map(l => (<li key={l}>{l}</li>))}</div>
			<div>Flag: <br/><img src={country.flags.png} /></div>
		</div>
	)
}

export default CountryInfo