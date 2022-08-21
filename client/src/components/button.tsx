import './_styles/button.css';

const Button = ({ 
        buttonLabel, 
        buttonColor,
        handleClick,
        type
    }
    : { buttonLabel: string, 
        buttonColor: string,
        handleClick?: React.MouseEventHandler<HTMLButtonElement>,
        type?: "submit" | "button" | "reset" | undefined
    })
    : JSX.Element => {
    return (
        <button type={type} className={`${buttonColor} button`} onClick={handleClick}>{buttonLabel}</button>
    );
}

export default Button;