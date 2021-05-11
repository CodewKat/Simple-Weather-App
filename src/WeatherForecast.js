import React, { useState } from 'react';

//API from openweathermap
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function WeatherForecast() {

    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('');

    const fetchWeatherData = evt => {
        if(evt.key === "Enter"){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);  
                console.log(data);      
            });
        }

    }

    const kelvinToCelsius = (k) => {
        return Math.round(k - 273.15);
    }

    return(

        <div className="Weather-app">
            <h1> Todays Weather</h1>
            <main>
                <div className="searchBox">
                    <label for="search">Location: </label>
                    <input
                        id="search"
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        onKeyPress= {fetchWeatherData}
                    />
                </div>
                <br />

                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="weatherBox">
                            <div className="weather">
                                {weather.weather[0].description}
                            </div>
                            <div className="temp">
                                {kelvinToCelsius(weather.main.temp)}°c
                            </div>
                            <div className="date">
                                {new Date().toLocaleDateString()}
                            </div>

                        </div>

                    </div>

                ): ('')}
            </main> 
    
            
        </div>



       
    );
    
}

export default WeatherForecast;



