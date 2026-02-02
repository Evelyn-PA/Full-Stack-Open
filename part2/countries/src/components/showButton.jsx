import { useState } from "react";

export default function ShowButton({ country }) {
    //Style for the button
    const style = {
        marginBottom: 5
    }

    const [showData, setShowData] = useState(false)
    const c = country[0]
    return (
        <>
            <button style={style} onClick={() => setShowData(!showData)}> {showData ? "Hide" : "Show"}</button>
            {showData && (
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
                </>)
            }
        </>
    )
}