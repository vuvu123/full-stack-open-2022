const CountryData = (props) => {
  const {country} = props

  return (
    <div>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
            )}
        </ul>
        <img src={country.flags.png} alt={country.name.common + ' flag'}></img>
    </div>
  )

}

export default CountryData