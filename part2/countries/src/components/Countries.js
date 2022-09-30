import CountryData from "./CountryData"

const Countries = (props) => {
  const { countriesToShow } = props

  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } 
  
  if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name.official}>{country.name.common}</div>)}
      </div>
    )
  } 
  
  if (countriesToShow.length === 1) {
    return (
      <div>
        <CountryData country={countriesToShow[0]} />
      </div>
    )
  }
}

export default Countries