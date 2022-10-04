import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true)
  const [message, setMessage] = useState('')

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
    const newPerson = {
      name: newName,
      number: newNumber
    }

    for (const person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          updatePerson(person.id, newPerson)
        }
        return
      }
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}.`)
        setNewName('')
        setNewNumber('')
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const personsToShow = showAllPersons
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const deletePerson = (id, name) => { 
    if (window.confirm(`Delete ${name} ?`))
      personsService
        .remove(id)
        .then(returnedPersons => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setShowAllPersons(updatedPersons)
        })
  }

  const updatePerson = (id, personObject) => {
    personsService
      .update(id, personObject)
      .then(returnedPerson => {
        const updatedPersons = persons.map(person =>
          person.id !== returnedPerson.id ? person : returnedPerson
        )
        setPersons(updatedPersons)
        setShowAllPersons(updatedPersons)
        setMessage(`Updated ${returnedPerson.name}'s phone number to ${returnedPerson.number}.`)
        setNewName('')
        setNewNumber('')
      })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App