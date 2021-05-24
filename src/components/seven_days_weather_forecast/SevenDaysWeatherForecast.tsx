import React, {useEffect, useState} from 'react';
import s from "./seven_days_weather_forecast.module.css";
import cloud from "../../icons/Academy-Weather-bg160.svg";
import {Select} from "../../constants/select/Select";
import ArrowLeft from "../../icons/arrow-left.svg";
import ArrowRight from "../../icons/arrow-right.svg";

export const SevenDaysWeatherForecast = () => {

    const [cities, setCities] = useState([]);
    const [isCityPiked, setIsCityPiked] = useState(false);
    const [data, setData] = useState([[]]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const windowSize = useWindowSize();

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

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
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=aafdb5f809e160cf1aea4d8d0e4107bf', {
            method: 'GET',
        })
            .then(function (response) {
                // console.log(response);
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                let dataArray: any = [];
                [1, 2, 3, 4, 5, 6, 7].map((i) => {
                        const date = new Date(data.daily[i].dt * 1000);
                        // console.log(date);
                        dataArray.push([
                            date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear(),
                            "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png",
                            (Math.round(data.daily[i].temp.day - 273.15) > 0 ? '+' + Math.round(data.daily[i].temp.day - 273.15) + '°' : '-' + Math.round(data.daily[i].temp.day - 273.15) + '°')])
                    }
                );
                setData(dataArray);
            });
    }

    const Cards = () => {
        const cards: any = [];
        if (windowSize.width <= 660) {
            [0, 1, 2, 3, 4, 5, 6].map((i) => {
                    if (data[i] !== undefined) {
                        cards.push(<div className={s.card}>
                            <p className={s.date}>{data[i][0]}</p>
                            <img className={s.weather_icon} src={data[i][1]}/>
                            <p className={s.temp}>{data[i][2]}</p>
                        </div>)
                    }
                }
            );
        } else {
            [start, end - 1, end].map((i) => {
                    if (data[i] !== undefined) {
                        cards.push(<div className={s.card}>
                            <p className={s.date}>{data[i][0]}</p>
                            <img className={s.weather_icon} src={data[i][1]}/>
                            <p className={s.temp}>{data[i][2]}</p>
                        </div>)
                    }
                }
            );
        }
        return (
            <div className={s.cards_layout}>
                <img className={(start === 0) ? s.arrow_left_dis : s.arrow_left} src={ArrowLeft} onClick={() => {
                    setStart(start - 1);
                    setEnd(end - 1);
                }}/>
                {cards}
                <img className={(end === 6) ? s.arrow_right_dis : s.arrow_right} src={ArrowRight} onClick={() => {
                    setStart(start + 1);
                    setEnd(end + 1);
                }}/>
            </div>
        );
    }

    const Content = () => {
        if (!isCityPiked) {
            return (
                <div>
                    <img className={s.cloud} src={cloud}/>
                    <p className={s.error_msg}>Fill in all the fields and the weather will be displayed</p>
                </div>
            )
        } else return (
            <Cards/>
        )
    }

    return (
        <div className={s.background}>
            <p className={s.title}>7 Days Forecast</p>
            <Select styles={s} placeholder="Select city" options={cities} isCityPiked={isCityPiked}
                    setIsCityPiked={setIsCityPiked} getData={getData}/>
            <Content/>
        </div>
    )
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}