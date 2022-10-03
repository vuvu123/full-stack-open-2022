import Person from './Person'

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
        {personsToShow.map(person => 
          <Person 
            key={person.name} 
            name={person.name} 
            number={person.number}
            deletePerson={deletePerson(person.id)} />)}
    </div>
  )
}

export default Persons