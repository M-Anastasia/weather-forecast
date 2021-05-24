import React, {useEffect, useState} from 'react';
import s from "./past_day_weather_forecast.module.css";
import {Datepicker} from "../../constants/datepicker/Datepicker";
import cloud from "../../icons/Academy-Weather-bg160.svg";
import {Select} from "../../constants/select/Select";

export const PastDayWeatherForecast = () => {

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    const [cities, setCities] = useState([]);
    const [isCityPiked, setIsCityPiked] = useState(false);
    const [isDatePicked, setIsDatePicked] = useState(false);
    const [date, setDate] = useState('');
    const [data, setData] = useState(["","",""]);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [isRequestDone, setIsRequestDone] = useState(false);

    useEffect(() => {
        let cities: any = [];
        cities.push(['Самара', 53.195873, 50.100193]);
        cities.push(['Тольятти', 53.507836, 49.420393]);
        cities.push(['Саратов', 51.533557, 46.034257]);
        cities.push(['Казань', 55.796127, 49.106405]);
        cities.push(['Краснодар', 45.035470, 38.975313]);
        setCities(cities);
    }, []);

    const getData = (lat: number, lon: number) => {
        setLat(lat);
        setLon(lon);
        setIsRequestDone(false);
    }

    const Card = () => {
        return (
            <div className={s.cards_layout}>
                <div className={s.card}>
                    <p className={s.date}>{data[0][0]}</p>
                    <img className={s.weather_icon} src={data[0][1]}/>
                    <p className={s.temp}>{data[0][2]}</p>
                </div>
            </div>
        );
    }

    const Content = () => {
        if (!isCityPiked || !isDatePicked) {
            return (
                <div>
                    <img className={s.cloud} src={cloud}/>
                    <p className={s.error_msg}>Fill in all the fields and the weather will be displayed</p>
                </div>
            )
        } else {
            if(!isRequestDone) {
                fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + lat + '&lon=' + lon + '&dt=' + new Date(date).getTime() / 1000 + '&appid=aafdb5f809e160cf1aea4d8d0e4107bf', {
                    method: 'GET',
                })
                    .then(function (response) {
                        console.log(response);
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        let dataArray: any = [];
                        const date = new Date(data.current.dt * 1000);
                        console.log(date);
                        const weatherIcon = data.current.weather[0].icon.replace('n','d');
                        dataArray.push([
                            date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear(),
                            "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png",
                            (Math.round(data.current.temp - 273.15) > 0 ? '+' + Math.round(data.current.temp - 273.15) + '°' : '-' + Math.round(data.current.temp - 273.15) + '°')]);
                        setData(dataArray);
                        setIsRequestDone(true)
                    });
            }
            return (
                <Card />
            )
        }

    }

    return (
        <div className={s.background}>
            <p className={s.title}>Forecast for a Date in the Past</p>
            <div className={s.inputs_layout}>
                <Select styles={s} placeholder="Select city" options={cities} isCityPiked={isCityPiked}
                        setIsCityPiked={setIsCityPiked} getData={getData}/>
                <Datepicker placeholder="Select date" styles={s} isDatePicked={isDatePicked}
                            setIsDatePicked={setIsDatePicked}
                            setDate={setDate} setIsRequestDone={setIsRequestDone}/>
            </div>
            <Content/>
        </div>
    )
}