import { useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Person from './component/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterPerson, setFilterPerson] = useState("")

  //Filtering the data
  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(filterPerson.trim().toLowerCase()))

  // Handlers
  const onNameChange = (e) => setNewName(e.target.value)
  const onPhoneChange = (e) => setNewPhone(e.target.value)
  const onFilterChange = (e) => setFilterPerson(e.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person => person.name === newName) ? window.alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({ name: newName, number: newPhone }))
    setNewName("")
    setNewPhone("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} onFilterChange={onFilterChange} />
      <h1>Add a new</h1>
      <PersonForm addPerson={addPerson} onNameChange={onNameChange} onPhoneChange={onPhoneChange} newName={newName} newPhone={newPhone}/>
      <h2>Numbers</h2>
      <Person filteredPerson={filteredPerson}/>
    </div>
  )
}

export default App