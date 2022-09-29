import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const filterName = (event) => {
    let name = event.target.value
    setNewFilter(name)

    if (name.length === 0) {
      setShowAllPersons(true)
    } else {
      setShowAllPersons(false)
    }
  }
  
  const addName = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${person.name} is already added to phonebook`)
        return
      }
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: setPersons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = showAllPersons
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={filterName} />
      </div>
      <form onSubmit={addName}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
      <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App