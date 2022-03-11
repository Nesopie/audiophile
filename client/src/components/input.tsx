import './_styles/input.css';

const Input = ({ label, placeholder, type }: { label: string, placeholder?: string, type: string }): JSX.Element => {
    return(
        <div>
            <label htmlFor={`${label}`}>{label}</label>
            <div className='input-div'>
                <input id={`${label}`} type={`${type}`} placeholder={placeholder} />
            </div>
        </div>
    );
}

export default Input;