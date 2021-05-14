import React, { useState } from 'react';

//API from openweathermap
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function WeatherForecast() {

    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('');
    const [name, setName] = useState('');

    const fetchWeatherData = evt => {
        if(evt.key === "Enter"){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);  
                console.log(data);
                setName(name);   
            });
        }

    }

    function customMessage(param){
        switch(true){
            case (param.indexOf('sky') >= 0):
                return 'Hope you have a good day!';
            case (param.indexOf('clouds') >= 0):
                return 'Bring extra layers to wear'
            case (param.indexOf('rain') >= 0):
                return 'Dont forget an umbrella'
            case (param.indexOf('thunderstorm') >= 0):
                return 'Stay safe and stay inside'
            default:
                return 'Hope you have a good day!';
        }
    }

    function refreshPage(){
        window.location.reload(false);
    }
    

    const kelvinToCelsius = (k) => {
        return Math.round(k - 273.15);
    }

    return(

        <div className="Weather-app">
            <main>
                <h1 className="header"> Current Weather conditions</h1>    
                <div className="inputInfo">
                    <div className="nameBox">
                        <label for="name">Enter Name: </label>
                        <input 
                            id="name"
                            type="text"
                            className="name-bar"
                            placeholder="Name..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}

                        />
                    </div>
                    <div className="searchBox">
                        <label for="search">Enter City: </label>
                        <input
                            id="search"
                            type="text"
                            className="search-bar"
                            placeholder="City..."
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            onKeyPress= {fetchWeatherData}
                        />
                    </div>
                    <p className="note"> Press enter to search.</p>
                </div>
                <br />

                {(typeof weather.main != "undefined") ? (
                    <div className="weatherOutcome">
                        <div className="nameBox">
                            <h2> Hi {name}, the current weather in {city} </h2>
                        </div>
                        <div className="icon">
                            <img
                                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                                alt="weather-Icon"
                                className="weatherIcon"
                            />
                        </div>
                            <div className="weather">
                                {weather.weather[0].description}
                            </div>
                            <div className="temp">
                                {kelvinToCelsius(weather.main.temp)}°c
                            </div>
                            <div className="customMessage">
                                {customMessage(weather.weather[0].description)}
                            </div>

                            <div>
                                <button className="refreshBtn" onClick={refreshPage}> Click to reload</button>
                            </div>

                    </div>

                ): ('')}
            </main> 
    
            
        </div>



       
    );
    
}

export default WeatherForecast;



