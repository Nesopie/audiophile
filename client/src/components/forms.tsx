import Form from './form';
import Input from './input';
import RadioInput from './radioInput';
import './_styles/forms.css';
import CashOnDelivery from './cashOnDelivery';

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
                    type="text"
                />
                <Input 
                    label='Email Address'
                    placeholder='ayman@gmail.com'
                    type="text"
                />
                <Input 
                    label='Phone Number'
                    placeholder='+91 1234567890'
                    type="text"
                />
            </Form>
            <Form
                formClass='shipping-info'
                formName='SHIPPING INFO'
            >
                <Input 
                    label='Your Address'
                    placeholder='India'
                    type="text"
                />
                <Input 
                    label='ZIP Code'
                    placeholder='123456'
                    type="text"
                />
                <Input 
                    label='City'
                    placeholder='Hyderabad'
                    type="text"
                />
                <Input 
                    label='Country'
                    placeholder='India'
                    type="text"
                />
            </Form>
            <Form
                formClass='payment-details'
                formName='PAYMENT DETAILS'
            >
                <RadioInput 
                    label='e-Money'
                />
                <RadioInput 
                    label='Cash on Delivery'
                />
            </Form>
            <div className='form-section e-money' style={{display: 'none'}}>
                <Input 
                    label='e-Money Number'
                    placeholder='1234567890'
                    type='text'
                />
                <Input 
                    label='e-Money PIN'
                    placeholder='1234'
                    type='text'
                />
            </div>
            <CashOnDelivery />
        </section>
    );
}

export default Forms;