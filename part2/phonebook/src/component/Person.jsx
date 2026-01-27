import personService from "../services/person"

export default function Person({ filteredPerson, onDelete }) {

    
    return (
        <ul>
            {filteredPerson.map(person => (<li key={person.id}>{person.name} {person.number} <button onClick={() => onDelete(person)}>Delete</button> </li>))}

        </ul>
    )
}