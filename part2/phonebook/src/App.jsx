import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  //The filter
  const [filterPerson, setFilterPerson] = useState("")
  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(filterPerson.trim().toLowerCase()))


  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person => person.name === newName) ? window.alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({ name: newName, number: newPhone }))
    setNewName("")
    setNewPhone("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <div> Filter shown with:<input value={filterPerson} onChange={(e) => setFilterPerson(e.target.value)} /> </div>
      <h1>Add a new</h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>number: <input value={newPhone} onChange={(p) => setNewPhone(p.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPerson.map(person=>(<li key={person.id}>{person.name} {person.number}</li>))}
      </ul>
      <div>debug: {filterPerson}</div>
    </div>
  )
}

export default App