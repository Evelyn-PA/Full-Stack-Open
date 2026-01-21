import { useState, useEffect } from 'react'
import personService from "./services/person"
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Person from './component/Person'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterPerson, setFilterPerson] = useState("")

  //Apply the useEffect to fetch the data
  useEffect(() => {
    personService
      .getAll()
      .then(personData => {
        setPersons(personData)
      })
  }, [])

  //Filtering the data
  const filteredPerson = persons.filter((person) => person.name && person.name.toLowerCase().includes(filterPerson.trim().toLowerCase()))

  // Handlers
  const onNameChange = (e) => setNewName(e.target.value)
  const onPhoneChange = (e) => setNewPhone(e.target.value)
  const onFilterChange = (e) => setFilterPerson(e.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.trim() === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName, number: newPhone }
    personService
      .addData(newPerson)
      .then(returnedPerson => {
        setPersons(prev => prev.concat(returnedPerson))
        setNewName("")
        setNewPhone("")
      })

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterPerson={filterPerson} onFilterChange={onFilterChange} />
      <h1>Add a new</h1>
      <PersonForm addPerson={addPerson} onNameChange={onNameChange} onPhoneChange={onPhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Person filteredPerson={filteredPerson} p={setPersons} />
    </div>
  )
}

export default App