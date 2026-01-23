import personService from "../services/person"

export default function Person({ filteredPerson, p }) {
    const displayConfirmation = (person) => {
        if (confirm(`Delete ${person.name}?`)) {
            deleteTheData(person.id)
        }
    }
    const deleteTheData = (id) => {
        personService
            .deleteData(id)
            .then(() => p(prev => prev.filter(person => person.id !== id)))
    }
    return (
        <ul>
            {filteredPerson.map(person => (<li key={person.id}>{person.name} {person.number} <button onClick={() => displayConfirmation(person)}>Delete</button> </li>))}

        </ul>
    )
}