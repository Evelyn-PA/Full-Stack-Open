import { useState, useEffect } from 'react'
import personService from "./services/person"
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Person from './component/Person'
import Notification from './component/Notification'
const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterPerson, setFilterPerson] = useState("")
  const [message, setMessage] = useState(null)

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
  const updateData = (id, updatedPerson) => {
    personService
      .changeData(id, updatedPerson)
      .then(() => setPersons(prev => prev.map(p => p.id === id ? updatedPerson : p)))
  }

  //Use for delete data
  const handleDeletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      deleteTheData(person.id)
    }
  }
  const deleteTheData = (id) => {
    personService
      .deleteData(id)
      .then(() => setPersons(prev => prev.filter(person => person.id !== id)))
  }

  const addPerson = (event) => {
    const existingPerson = persons.find(person => person.name.trim() === newName)
    event.preventDefault()

    if (existingPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...existingPerson,
          number: newPhone
        }
        updateData(existingPerson.id, updatedPerson)
        setMessage(`The number of ${existingPerson.name} changed to ${newPhone}`)
        setTimeout(() => {
          setMessage(null)
        }, 1000)
        setNewName("")
        setNewPhone("")
      }
    }

    //Person not exist => Create new person object
    else {
      const newPerson = { name: newName, number: newPhone }
      personService
        .addData(newPerson)
        .then(returnedPerson => {
          setPersons(prev => prev.concat(returnedPerson))
          setNewName("")
          setNewPhone("")
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 1000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filterPerson={filterPerson} onFilterChange={onFilterChange} />
      <h1>Add a new</h1>
      <PersonForm addPerson={addPerson} onNameChange={onNameChange} onPhoneChange={onPhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Person filteredPerson={filteredPerson} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App