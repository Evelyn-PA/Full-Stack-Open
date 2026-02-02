import axios from "axios"
const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseURL = "https://api.openweathermap.org/data/2.5/weather"

const getAllWeather = (lat, lon) => {
    const request = axios.get(`${baseURL}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}
export default {
    getAllWeather: getAllWeather
}