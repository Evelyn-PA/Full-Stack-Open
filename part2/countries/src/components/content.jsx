export default function Content({ country }) {
    const c = country;
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