import { useState } from "react"
import CountryData from "./CountryData"

const Countries = (props) => {
  const { countriesToShow } = props
  const [country, setCountry] = useState('')

  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } 
  
  if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name.official}>
            {country.name.common} <button onClick={() => setCountry(country)}>Show</button>
          </div>)}
        {country ? <CountryData country={country} /> : null}
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