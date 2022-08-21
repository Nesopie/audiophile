import React from "react";
import './_styles/form.css';

const Form = ({ formClass, formName, children }: {formClass: string, formName: string | null, children: React.ReactNode}): JSX.Element => {
    return(
        <section className={`section-${formClass} form-section`}>
            {formName ? <h4>{formName}</h4> : null}
            <section className={`${formClass}`}>
                {children}
            </section>
        </section>
    );
}

export default Form;