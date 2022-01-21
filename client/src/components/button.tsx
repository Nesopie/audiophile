import './_styles/button.css';

const Button = ({ buttonLabel, buttonColor }: {buttonLabel: string, buttonColor: string}): JSX.Element => {
    return (
        <button className={`${buttonColor} button`}>{buttonLabel}</button>
    )
}

export default Button;