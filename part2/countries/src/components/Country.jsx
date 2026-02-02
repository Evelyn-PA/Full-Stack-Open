export default function Country({ country, filterInput }) {
    const showingContent = () => {
        if (country.length > 10 && filterInput !== "") {
            return <p>Too many matches, specify another filter</p>
        }
        else if (country.length > 1 && country.length <= 10) {
            return (
                country.map((c) => (
                    <div key={c.name.common}>
                        <p>{c.name.common}</p>
                    </div>
                ))
            )
        }
        else if (country.length === 1) {
            const c = country[0];
            return (
                <>
                    <h1>{c.name.common}</h1>
                    <p>Capital: {c.capital}</p>
                    <p>Area: {c.area}</p>
                    <h3>Languages</h3>
                    <ul >{Object.values(c.languages).map((lang) =>
                    (
                        <li key={lang}>{lang}</li>
                    ))}</ul>
                    <img src={c.flags.png} alt={c.flags.alt} />
                </>
            )
        }
    }
    return showingContent()
}
