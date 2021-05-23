import React, {useEffect, useState} from 'react';
import s from "./seven_days_weather_forecast.module.css";
import cloud from "../../icons/Academy-Weather-bg160.svg";
import {Select} from "../../constants/select/Select";

export const SevenDaysWeatherForecast = () => {

    const [cities, setCities] = useState([]);
    const [isCityPiked, setIsCityPiked] = useState(false);

    useEffect(() => {
        let cities = [];
        cities.push('Samara');
        cities.push('Togliatty');
        cities.push('Syzran');
        cities.push('Novokuibyshevsk');
        cities.push('Chepaevsk');
        setCities(cities);
    }, []);

    const Content = () => {
        if (!isCityPiked) {
            return (
                <div>
                    <img className={s.cloud} src={cloud}/>
                    <p className={s.error_msg}>Fill in all the fields and the weather will be displayed</p>
                </div>
            )
        } else return <div>content</div>
    }

    return (
        <div className={s.background}>
            <p className={s.title}>7 Days Forecast</p>
            <Select styles={s} placeholder="Select city" options={cities} isCityPiked={isCityPiked}
                    setIsCityPiked={setIsCityPiked}/>
            <Content />
        </div>
    )
}