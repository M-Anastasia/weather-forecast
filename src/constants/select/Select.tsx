import React, {useEffect, useState} from 'react';
import s from './select.module.css';

// @ts-ignore
export const Select = props => {

    const [pikedCity, setPikedCity] = useState('');

    useEffect(() => {
        setPikedCity(props.placeholder);
    }, []);

    const Options = () => {
        const options = props.options.map((option: any) =>
            <li onClick={() => {
                console.log(option[0] + ' was clicked' + option[1] + option[2]);
                setPikedCity(option[0]);
                props.setIsCityPiked(true);
                props.getData(option[1], option[2]);
            }}>{option[0]}</li>
        );
        return <ul className={props.styles.shift_options}>{options}</ul>;
    }

    return (
        <details className={props.styles.shift}>
            <summary className={props.isCityPiked ? s.piked : s.unpicked}>
                {pikedCity}
            </summary>
            <Options/>
        </details>
    )
}