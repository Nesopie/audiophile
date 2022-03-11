import React from "react";
import './_styles/form.css';

const Form = ({ formClass, formName, children }: {formClass: string, formName: string | null, children: React.ReactNode}): JSX.Element => {
    return(
        <section className={`section-${formClass} form-section`}>
            {formName ? <h4>{formName}</h4> : null}
            <form className={`${formClass}`}>
                {children}
            </form>
        </section>
    );
}

export default Form;