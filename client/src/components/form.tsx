import React from "react";
import './_styles/form.css';

const Form = ({ formClass, formName, children }: {formClass: string, formName: string, children: React.ReactNode}): JSX.Element => {
    return(
        <section className={`section-${formClass} form-section`}>
            <h4>{formName}</h4>
            <form className={`${formClass}`}>
                {children}
            </form>
        </section>
    );
}

export default Form;