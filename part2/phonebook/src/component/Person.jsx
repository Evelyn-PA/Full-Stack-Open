export default function Person({filteredPerson}) {
    return (
        <ul>
            {filteredPerson.map(person => (<li key={person.name}>{person.name} {person.number}</li>))}
        </ul>
    )
}