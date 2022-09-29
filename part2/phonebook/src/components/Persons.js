import Person from './Person'

const Persons = ({ personsToShow }) => {
  return (
    <div>
        {personsToShow.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default Persons