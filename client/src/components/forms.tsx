import Form from './form';
import Input from './input';
import './_styles/forms.css';

const Forms = ():JSX.Element => {
    return (
        <section className='checkout'>
            <Form
                formClass='billing-details'
                formName='BILLING DETAILS'
            >
                <Input 
                    label='Name'
                    placeholder='Ayman'
                />
                <Input 
                    label='Email Address'
                    placeholder='ayman@gmail.com'
                />
                <Input 
                    label='Phone Number'
                    placeholder='+91 1234567890'
                />
            </Form>
            <Form
                formClass='shipping-info'
                formName='SHIPPING INFO'
            >
                <Input 
                    label='Your Address'
                    placeholder='India'
                />
                <Input 
                    label='ZIP Code'
                    placeholder='123456'
                />
                <Input 
                    label='City'
                    placeholder='Hyderabad'
                />
                <Input 
                    label='Country'
                    placeholder='India'
                />
            </Form>
        </section>
    );
}

export default Forms;