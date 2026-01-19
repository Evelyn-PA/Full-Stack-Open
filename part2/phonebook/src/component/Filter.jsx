export default function Filter({filterPerson, onFilterChange}) {
    return (
        <div> Filter shown with:<input value={filterPerson} onChange={onFilterChange} /> </div>
    )
}