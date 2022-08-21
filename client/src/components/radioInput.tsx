import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import './_styles/input.css';

const RadioInput = ({ label }: { label: string  }): JSX.Element => {
    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const radioBtns: NodeListOf<HTMLInputElement> = document.querySelectorAll('[type="radio"]');
        radioBtns.forEach((radioBtn) => {
            if(radioBtn.checked) {
                radioBtn.parentElement?.setAttribute("style", "border: 1px solid #d87c4a");
            }else {
                radioBtn.parentElement?.setAttribute("style", "border: 1px solid var(--dark-grey)");
            }
        })
    }

    return(
        <div className='radio-input-div' >
            <input type='radio' name='payment' onClick={handleClick} />
            <label htmlFor={`${label}`}>{label}</label>
        </div>
    );
}

export default RadioInput;