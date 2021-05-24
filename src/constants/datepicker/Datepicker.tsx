import React, {useState} from 'react';
import s from './datepicker.module.css';

// @ts-ignore
export const Datepicker = props => {

    const [date, setDate] = useState(props.placeholder);

    const dateFormat = require('dateformat');
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const sixthDayBefore = new Date(new Date().setDate(new Date().getDate() - 5));
    const max = dateFormat(yesterday, "yyyy-mm-dd");
    const min = dateFormat(sixthDayBefore, "yyyy-mm-dd");

    const handleInputChange = (target: any) => {
        setDate(target.target.value);
        props.setIsDatePicked(true);
        props.setDate(target.target.value);
        props.setIsRequestDone(false);
    }

    return (
        <div className={props.styles.shift_datepicker}>
            <input onChange={handleInputChange} className={s.datepicker} type='date' placeholder={props.placeholder}
                   max={max}
                   min={min}
                   onFocusCapture={event => {
                       event.target.style.borderColor = '#373AF5';
                       event.target.style.outline = '0';

                   }}
                   onBlur={event => event.target.style.border = '2px solid rgba(128, 131, 164, 0.2)'}
            />
            <p className={s.datepicker_text}>{date === props.placeholder ? date : dateFormat(date, "dd/mm/yyyy")}</p>
        </div>
    )
}