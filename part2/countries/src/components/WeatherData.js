import { useState, useEffect } from "react"
import axios from 'axios'

const WeatherData = ({ city }) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [data, setData] = useState([])

  const hook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
      .then(response => setData(response.data))
  }
  useEffect(hook, [])

  return (
    <>
      {data.main ? (
        <div>
          <h3>Weather in {city}</h3>
          <div>Temperature: {data.main.temp} celsius</div>
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather icon'/>
          <div>Wind: {data.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  )
}

export default WeatherData