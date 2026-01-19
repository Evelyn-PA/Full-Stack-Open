export default function PersonForm({ addPerson, onNameChange, onPhoneChange, newName, newPhone }) {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={onNameChange} />
            </div>
            <div>number: <input value={newPhone} onChange={onPhoneChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}