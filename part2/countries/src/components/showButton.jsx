export default function ShowButton({ country, selectedCountry, setSelectedCountry }) {
    const style = {
        marginBottom: 5,
        marginLeft: 3,
        borderRadius: 4,
        border: "none"
    }
    return (
        <button style={style} onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}>
            {selectedCountry === country ? "Hide" : "Show"}
        </button>
    )
}