import { MouseEventHandler } from 'react';
import './_styles/button.css';

const Button = ({ 
        buttonLabel, 
        buttonColor, 
        handleClick 
    }
    : { buttonLabel: string, 
        buttonColor: string, 
        handleClick: MouseEventHandler<HTMLButtonElement>})
    : JSX.Element => {
    return (
        <button className={`${buttonColor} button`} onClick={handleClick}>{buttonLabel}</button>
    );
}

export default Button;