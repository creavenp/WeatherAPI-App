import React, { useEffect, useState } from 'react';
import './App.css';

// Initializing the requests
const apiData = {
  'key': '', // utilize own API key for time being, need to properly protect API key while allowing usage of app and functionality
  'url': 'http://api.openweathermap.org/data/2.5/weather?'
}

// Constant for month
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']

function Location() {

  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState({})
  const [query, setQuery] = useState('')
  const [month, setMonth] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const url = `${apiData.url}q=${query}&units=imperial&appid=${apiData.key}`
    async function getWeather() {
      const response = await fetch(url)
      const data = await response.json()
      setWeather(data)
    }
    getWeather()
  },[query]);

  const updateLocation = e => {
    setLocation(e.target.value)
  }

  const getLocation = e => {
    e.preventDefault()
    setQuery(location)
    let today = new Date()
    setMonth(monthArr[today.getMonth()])
    setDate(today.getDate())
    setLocation('')
  }

  function windDetermine(val) {
    if (val >= 340 && val <= 25) {
      return 'E'
    }
    else if (val > 25 && val < 75) {
      return 'NE'
    }
    else if (val >= 75 && val <= 115) {
      return 'N'
    }
    else if (val > 115 && val < 160) {
      return 'NW'
    }
    else if (val >= 160 && val <= 200) {
      return 'W'
    }
    else if (val > 200 && val < 250) {
      return 'SW'
    }
    else if (val >= 250 && val <= 300) {
      return 'S'
    }
    else if (val > 300 && val < 340) {
      return 'SE'
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='search-bar'>
          <form onSubmit={getLocation}>
            <input className="search-txt" type='text' placeholder='City' value={location} onChange={updateLocation}></input>
            <button className='search-btn'>Search</button>
          </form>
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div className='weatherInfo'>
            <h1 id='temp'>{Math.round(weather.main.temp)}°F</h1>
            <h2 id='location'>{weather.name}, {weather.sys.country}</h2>
            <p id='description'>{weather.weather[0].description}</p>
          </div>
        ) : ('')}
      </div>
      <p id='month'>{month}</p>
      <p id='date'>{date}</p>
      {(typeof weather.weather != 'undefined') ? (
        <div>
          <ul className='weatherAspects'>
            <li>Humidity: {weather.main.humidity}%</li>
            <li>Wind Speed: {Math.round(weather.wind.speed)}</li>
            <li>Wind Direction: {windDetermine(weather.wind.deg)}</li>
          </ul>
        </div>
      ) : ('')}
    </div>
  );
}


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Location/>
      </div>
    );
  }
}

export default App;
