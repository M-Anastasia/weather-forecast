import React from 'react';
import s from "./past_day_weather_forecast.module.css";
import {Datepicker} from "../../constants/datepicker/Datepicker";

export const PastDayWeatherForecast = () => {
    return (
        <div className={s.background}>
            <Datepicker placeholder="Select date" />
        </div>
    )
}