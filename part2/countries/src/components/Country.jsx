import Content from "./content";
import { useState } from "react";
import ShowButton from "./showButton";


export default function Country({ country, filterInput }) {
    const [selectedCountry, setSelectedCountry] = useState(null)
    const showingContent = () => {
        if (country.length > 10 && filterInput !== "") {
            return <p>Too many matches, specify another filter</p>;
        } else if (country.length > 1 && country.length <= 10) {
            return country.map((c) => (
                <div key={c.name.common}>
                    <span>{c.name.common} </span>
                    <ShowButton country={c}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry} />
                    {selectedCountry === c && <Content country={c} />}
                </div>
            ));

        } else if (country.length === 1) {
            return <Content country={country[0]} />;
        }
    };

    return showingContent();
}
