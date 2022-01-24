const Input = ({ label, placeholder }: { label: string, placeholder: string }): JSX.Element => {
    return(
        <div>
            <label htmlFor={`${label}`}>{label}</label>
            <input type="text" placeholder={placeholder} />
        </div>
    );
}

export default Input;