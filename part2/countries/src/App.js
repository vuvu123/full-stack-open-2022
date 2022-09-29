import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,capital,languages,area,flags')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleCountrySearch = (event) => {
    const input = event.target.value
    setSearch(input)

    setCountriesToShow(
      countries.filter(country => {
        country.name.common.toLowerCase().includes(input.toLowerCase())
      })
    )
  }

  return (
    <div>
      <div>
      final countries <input value={search} onChange={handleCountrySearch} />
      </div>
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;
