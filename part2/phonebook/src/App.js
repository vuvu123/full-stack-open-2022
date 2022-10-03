import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import axios from 'axios'

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

  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

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
  
  const addPerson = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${person.name} is already added to phonebook`)
        return
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = showAllPersons
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterName={filterName} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App