import React, {useEffect, useState} from 'react';
import s from './datepicker.module.css';
import calendar from '../../icons/calendar.svg';
// import * as $ from 'jquery';

// @ts-ignore
export const Datepicker = props => {

    // useEffect(() => {
    //     var mindate = new Date();
    //     mindate.setDate(mindate.getDate() - 8);
    //     var maxdate = new Date();
    //     maxdate.setDate(maxdate.getDate() - 1);
    //     // @ts-ignore
    //     $('#minMaxExample').datepicker({
    //         language: 'en',
    //         range : true,
    //         minDate : mindate,
    //         maxDate : maxdate,
    //         multipleDates: true,
    //         multipleDatesSeparator: " - "
    //     })
    // }, []);

    const [date, setDate] = useState(props.placeholder);

    const dateFormat = require('dateformat');
    const now = new Date(new Date().setDate(new Date().getDate()-1));
    const max = dateFormat(now, "yyyy-mm-dd");

    const handleInputChange = (target:any) => {
        setDate(target.target.value);
    }

    return (
        <div>
            <input onChange={handleInputChange} className={s.datepicker} type='date' placeholder={props.placeholder} max={max}
                   onFocusCapture={event => {
                       event.target.style.borderColor = '#373AF5';
                       event.target.style.outline =  '0';

                   }}
                   onBlur={event => event.target.style.border = '2px solid rgba(128, 131, 164, 0.2)'}
            />
            <p className={s.datepicker_text}>{date === props.placeholder ? date : dateFormat(date, "dd/mm/yyyy")}</p>
        </div>
    )
}