import React, {useEffect, useState} from 'react';
import s from './select.module.css';

export const Select = props => {

    const [pikedCity, setPikedCity] = useState('');
    const [isCityPiked, setIsCityPiked] = useState(false);

    useEffect(() => {
        setPikedCity(props.placeholder);
    }, []);

    const Options = () => {
        const options = props.options.map((option) =>
            <li onClick={() => {
                console.log(option + ' was clicked');
                setPikedCity(option);
                setIsCityPiked(true);
            }}>{option}</li>
        );
        return <ul>{options}</ul>;
    }

    return (
        <details>
            <summary className={isCityPiked ? s.piked : s.unpicked}>
                {pikedCity}
            </summary>
            <Options />
        </details>
    )
}