import { useState, useEffect } from "react"
import countriesService from "./services/countries_api"
import CountryForm from "./components/countriesFilter"
import Country from "./components/Country"
import Weather from "./services/weather"
const App = () => {
  const [country, setCountry] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  //Fetch the data 
  useEffect(() => {
    countriesService
      .getAll()
      .then(countryData => { setCountry(countryData) })
  }, [])

  // Filtering the data 
  const filteredCountry = country.filter((c) => c.name.common && c.name.common.toLowerCase().includes(filterCountry.trim().toLowerCase()))

  //Handlers
  const onFilterChange = (e) => setFilterCountry(e.target.value)
  return (
    <div>
      <CountryForm country={filterCountry} onFilterChange={onFilterChange} />
      <Country country={filteredCountry} filterInput={filterCountry} />
    </div>

  )

}
export default App