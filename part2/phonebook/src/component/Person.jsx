import personService from "../services/person"

export default function Person({ filteredPerson, p }) {
    const deleteTheData = (id) => {
        personService
            .deleteData(id)
            .then(() => p(prev => prev.filter(person => person.id !== id)))
    }
    return (
        <ul>
            {filteredPerson.map(person => (<li key={person.id}>{person.name} {person.number} <button onClick={() => deleteTheData(person.id)}>Delete</button> </li>))}

        </ul>
    )
}