import { useEffect, useState } from "react";
import getWeather from "../services/weather";
export default function Weather({name,lat,lon}) {
    const [weather, setWeather] = useState(null)

    //Fetch the weather
    useEffect(() => {
        getWeather
            .getAllWeather(lat, lon)
            .then(weatherData => { setWeather(weatherData) })
    }, [lat, lon])

    return(
        <>
        <h2>Weather in {name}</h2>
        <p>Temerature {weather&& weather.main.temp} Celsius</p>
        </>
    )
}

