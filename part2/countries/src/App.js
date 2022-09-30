import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
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

  const handleFilter = (event) => {
    const search = event.target.value
    setFilter(search)
    setCountriesToShow(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase()))
    )
  }

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleFilter} />
      </div>
      <div>
        <Countries countriesToShow={countriesToShow} />
      </div>
    </div>
  )
}

export default App
