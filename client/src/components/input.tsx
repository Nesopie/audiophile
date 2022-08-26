import React  from 'react';
import { UseFormRegister, Path, FieldError } from 'react-hook-form';
import { IFormValues } from './forms';

import './_styles/input.css';

interface IInputProps {
    label: Path<IFormValues>;
    placeholder: string;
    type: string;
    register: UseFormRegister<IFormValues>;
    required?: boolean;
    error?: FieldError | undefined;
    other?: Partial<Other>
}

interface Other {
    pattern: RegExp;
    minLength: number;
    maxLength: number;
}

type myErrors = 'required' | 'minLength' | 'maxLength' | 'pattern';

const Input = ({ label, placeholder, type, register, required, error, other }: IInputProps): JSX.Element => {
    const errorMessageMapper = {
        required: () => `${label} is required`,
        minLength: () => `Minimum of ${other?.minLength} characters are required`,
        maxLength: () => `Maximum of ${other?.maxLength} characters are required`,
        pattern: () => 'Wrong format'
    }

    return(
        <div>
            <div className="input-meta">
                <label htmlFor={`${label}`}>{label}</label>
                {error && <span>{errorMessageMapper[error.type as myErrors]()}</span>}
            </div>
            <div className='input-div'>
                <input 
                    id={`${label}`} 
                    type={`${type}`} 
                    placeholder={placeholder} 
                    {...register(label, { required, ...other })}
                />
            </div>
        </div>
    );
}

export default React.memo(Input);