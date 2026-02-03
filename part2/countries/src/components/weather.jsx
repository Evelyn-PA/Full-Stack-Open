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
        weather === null ? <p>Loading the data....</p> : (
        <>
        <h2>Weather in {name}</h2>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
        <p>Wind {weather.wind.speed} m/s</p>
        </>
        )
    )
}

