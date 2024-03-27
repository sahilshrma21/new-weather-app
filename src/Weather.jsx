import React, { useState } from 'react';
import './Weather.css';
const Weather = () => {

    const api = {
        key: '50aee81eac7bd88a2badbeec985594f2',
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getDay()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
        }
    }


    return (
        <div className={(typeof weather.main != "undefined")?((weather.main.temp > 16)?'app-warm':'app'):'app'}>
            <main>
                <div className='search-box'>
                    <input type='text' className='search-bar' placeholder='Search...' value={query} onChange={(e) => { setQuery(e.target.value) }} onKeyPress={search}
                    />
                </div>
                <div className='location-box'>
                    <div className='location'>
                        {weather.name && weather.sys && weather.sys.country &&
                            <>
                                {weather.name}, {weather.sys.country}
                                <div className='date'>{dateBuilder(new Date())}
                                </div>
                            </>
                        }
                    </div>
                    <div className='weather-box'>
                        {weather.main && weather.main.temp &&
                            <div className='temp'>{Math.round(weather.main.temp)}°C</div>
                        }
                        {weather.weather && weather.weather.length > 0 &&
                            <div className='weather'>{weather.weather[0].main}</div>
                        }
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Weather

