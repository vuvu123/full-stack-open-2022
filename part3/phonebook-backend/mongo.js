const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.gbdb4jq.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const showAllPersons = () => {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected', '\n')
    console.log('Phonebook:')
    
    Person.find({}).then(persons => {
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
  })
}

const addPerson = () => {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: `${name}`,
      number: `${number}`
    })

    return person.save()
  }).then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    return mongoose.connection.close()
  }).catch(err => console.log(err))
}

console.log('Arg count: ', process.argv.length)

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log('To view all entries in the phonebook, please use the format: node mongo.js <password>')
  console.log('To add a person, please use the format: node mongo.js <password> <name> <number>')
  process.exit(1)
}

if (process.argv.length === 3) {
  showAllPersons()
}

if (process.argv.length > 4) {
  addPerson()
}

