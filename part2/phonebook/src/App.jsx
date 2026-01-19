import { useState, useEffect } from 'react'
import axios from 'axios'
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
    persons.some(person => person.name === newName) ? window.alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({ name: newName, number: newPhone }))
    const newPerson = { name: newName, number: newPhone }
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewPhone("")
      })

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} onFilterChange={onFilterChange} />
      <h1>Add a new</h1>
      <PersonForm addPerson={addPerson} onNameChange={onNameChange} onPhoneChange={onPhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Person filteredPerson={filteredPerson} />
    </div>
  )
}

export default App