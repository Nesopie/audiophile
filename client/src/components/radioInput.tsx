import React, { useEffect } from 'react';
import './_styles/input.css';

const RadioInput = ({ label }: { label: string  }): JSX.Element => {
    const changeColor = (event: React.MouseEvent | React.FocusEvent) => {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const parentDiv: HTMLElement | null = input.parentElement;
        console.log(input.checked);
        if(!parentDiv) return;
        if(input.checked) {
            parentDiv.setAttribute('style', 'border: 1px solid #d87c4a');
        }else {
            parentDiv.setAttribute('style', 'border: 1px solid #898989');
        }
    }

    return(
        <div className='radio-input-div'>
            <input type='radio' name='payment' onClick={changeColor} onBlur={(event) => setTimeout(() => changeColor(event), 100)}/>
            <label htmlFor={`${label}`}>{label}</label>
        </div>
    );
}

export default RadioInput;