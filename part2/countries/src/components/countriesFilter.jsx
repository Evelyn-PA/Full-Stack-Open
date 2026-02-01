export default function CountryForm({ country, onFilterChange }) {

    return (
        <form>
            <h3>Find countries <input value={country} onChange={onFilterChange} /></h3>
        </form>
    );
}