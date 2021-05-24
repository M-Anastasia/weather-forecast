import React from 'react';
import './App.css';
import up from './icons/Academy-Weather forecast-Bg-up.svg';
import bottom from './icons/Academy-Weather forecast-Bg-buttom.svg';
import {PastDayWeatherForecast} from "./components/past_day_weather_forecast/PastDayWeatherForecast";
import {SevenDaysWeatherForecast} from "./components/seven_days_weather_forecast/SevenDaysWeatherForecast";

function App() {
    return (
        <div className="app">
            <img className="up" src={up}/>
            <img className="bottom" src={bottom}/>
            <div className="layout">
                <header className="header">
                    <div className="header-font1">Weather</div>
                    <div className="header-font2">forecast</div>
                </header>
                <main className="main">
                    <SevenDaysWeatherForecast/>
                    <PastDayWeatherForecast/>
                </main>
                <footer className="footer">
                    <p className="footer-font">C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
