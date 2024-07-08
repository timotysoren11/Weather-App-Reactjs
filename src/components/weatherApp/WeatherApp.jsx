import React, { useState } from 'react'
import './WeatherApp.css'

//Image importing 
import search_icon from '../assests/search.png';
import clear_icon from '../assests/clear.png';
import cloud_icon from '../assests/cloud.png';
import drizzle_icon from '../assests/drizzle.png';
import rain_icon from '../assests/rain.png';
import snow_icon from '../assests/snow.png';
import wind_icon from '../assests/wind.png';
import humidity_icon from '../assests/humidity.png';

//Weather App function
const WeatherApp = () => {

  //Importing Weather API
  let api_key = "8e17e6e6ce8ccd7771901a8ee865dec2";

  const [wicon,setWicon] = useState(cloud_icon);

  // Fetching the data from Weather API and displaying it
  const search = async() => {
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value===""){
      return 0;
    } 

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;

    let response = await fetch(url);
    //passing the data in JSON format
    let data = await response.json();

    //Grab the element
    const humidity = document.getElementsByClassName("humidity");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    //display the element
    humidity[0].innerHTML= data.main.humidity+"%";
    wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp)+" C";
    location[0].innerHTML = data.name;

    // Changing the symbol
    if(data.weather[0].icon==="01d" ||  data.weather[0].icon==="01n"){
      setWicon(clear_icon);
    }
    else if(data.weather[0].icon==="02d" ||  data.weather[0].icon==="02n"){
      setWicon(cloud_icon);
    }
    else if(data.weather[0].icon==="03d" ||  data.weather[0].icon==="03n"){
      setWicon(drizzle_icon);
    }
    else if(data.weather[0].icon==="04d" ||  data.weather[0].icon==="04n"){
      setWicon(drizzle_icon);
    }
    else if(data.weather[0].icon==="09d" ||  data.weather[0].icon==="09n"){
      setWicon(rain_icon);
    }
    else if(data.weather[0].icon==="10d" ||  data.weather[0].icon==="10n"){
      setWicon(cloud_icon);
    }
    else if(data.weather[0].icon==="13d" ||  data.weather[0].icon==="13n"){
      setWicon(snow_icon);
    }
    else{
      setWicon(clear_icon);
    }
  }


  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className='cityInput' placeholder='search' />
        <div className="search-icon" onClick={() =>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-content">
        <div className="weather-image">
          <img src={cloud_icon} alt="" />
        </div>
        <div className="weather-temp">24C</div>
        <div className="weather-location">London</div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            <div className="wind-rate">64%</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
