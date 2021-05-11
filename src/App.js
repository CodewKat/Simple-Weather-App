import './App.css';
import React from 'react';
import WeatherForecast from './WeatherForecast';

class App extends React.Component{
  render(){

    return(
      <div className="App">
        <WeatherForecast />
      </div>
    );
  }
}

export default App;
