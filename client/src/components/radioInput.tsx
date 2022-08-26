import { useEffect } from 'react';
import './_styles/input.css';

const RadioInput = ({ label, setShowCash }: { label: string, setShowCash: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
    const handleClick = (_event: React.MouseEvent<HTMLInputElement>) => {
        const radioBtns: NodeListOf<HTMLInputElement> = document.querySelectorAll('[type="radio"]');
        radioBtns.forEach((radioBtn) => {
            if(radioBtn.checked) {
                radioBtn.parentElement?.setAttribute("style", "border: 1px solid #d87c4a");
            }else {
                setShowCash(label === "Cash on Delivery");
                radioBtn.parentElement?.setAttribute("style", "border: 1px solid var(--dark-grey)");
            }
        })
    }

    useEffect(() => {
        const button: HTMLInputElement | null = document.querySelector('#checkout > section.section-payment-details.form-section > section > div:nth-child(2) > div:nth-child(1) > input[type=radio]');
        if(!button)
            return;
        button.checked = true;
        button.parentElement?.setAttribute("style", "border: 1px solid #d87c4a");
    }, [])

    return(
        <div className='radio-input-div' >
            <input type='radio' name='payment' onClick={ handleClick } />
            <label htmlFor={`${label}`}>{label}</label>
        </div>
    );
}

export default RadioInput;