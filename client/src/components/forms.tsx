import { useForm, SubmitHandler } from 'react-hook-form'
import Form from './form';
import Input from './input';
import RadioInput from './radioInput';
import './_styles/forms.css';
import CashOnDelivery from './cashOnDelivery';
import { useState } from 'react';
import PaymentCompleted from './paymentCompleted';
import userService from '../services/users'

export interface IFormValues {
    'Name': string;
    'Email Address': string;
    'Phone Number': string;
    'Your Address': string;
    'ZIP Code': string;
    'City': string;
    'Country': string;
    'e-Money Number': string;
    'e-Money PIN': string;
    'Username': string;
    'Password': string;
}

const Forms = ():JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>();
    const [ show, setShow ] = useState<boolean>(false);
    const [ showCash, setShowCash ] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        const form: HTMLFormElement | null = document.querySelector('#checkout');
        try {
            userService.deleteCart();
            setShow(true);
            form?.reset();
        }catch(err: unknown) {
            if(err instanceof Error) 
                console.log(err);
        }
    }

    return (
        <form id="checkout" className='checkout' onSubmit={handleSubmit(onSubmit)}>
            <h2>Checkout</h2>
            <Form
                formClass='billing-details'
                formName='BILLING DETAILS'
            >
                <Input 
                    label='Name'
                    placeholder='Name'
                    type="text"
                    register={register}
                    required={true}
                    error={errors["Name"]}
                />
                <Input 
                    label='Email Address'
                    placeholder='name@example.com'
                    type="email"
                    register={register}
                    required={true}
                    error={errors["Email Address"]}
                    other={
                        {
                            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        }
                    }
                />
                <Input 
                    label='Phone Number'
                    placeholder='+91 1234567890'
                    type="text"
                    register={register}
                    required={true}
                    error={errors["Phone Number"]}
                    other={
                        {
                            minLength: 10,
                            maxLength: 10
                        }
                    }
                />
            </Form>
            <Form
                formClass='shipping-info'
                formName='SHIPPING INFO'
            >
                <Input 
                    label='Your Address'
                    placeholder='Address'
                    type="text"
                    register={register}
                    error={errors["Your Address"]}
                    required={true}
                    other={
                        {
                            minLength: 8,
                            maxLength: 30
                        }
                    }
                />
                <Input 
                    label='ZIP Code'
                    placeholder='123456'
                    type="text"
                    register={register}
                    error={errors["ZIP Code"]}
                    required={true}
                    other={{
                        minLength: 6,
                        maxLength: 6
                    }}
                />
                <Input 
                    label='City'
                    placeholder='Hyderabad'
                    type="text"
                    register={register}
                    error={errors["City"]}
                    required={true}
                    other={{
                        minLength: 5,
                        maxLength: 25
                    }}
                />
                <Input 
                    label='Country'
                    placeholder='India'
                    type="text"
                    register={register}
                    required={true}
                    error={errors["Country"]}
                    other={{
                        minLength: 3,
                        maxLength: 25
                    }}
                />
            </Form>
            <Form
                formClass='payment-details'
                formName='PAYMENT DETAILS'
            >
                <div>
                    <strong>Payment Method</strong> 
                </div>
                <div>
                    <RadioInput 
                        label='e-Money'
                        setShowCash={setShowCash}
                    />
                    <RadioInput 
                        label='Cash on Delivery'
                        setShowCash={setShowCash}
                    />
                </div>
            </Form>
            <div className='form-section e-money' style={{display: 'none'}}>
                <Input 
                    label='e-Money Number'
                    placeholder='1234567890'
                    type='text'
                    register={register}
                />
                <Input 
                    label='e-Money PIN'
                    placeholder='1234'
                    type='text'
                    register={register}
                />
            </div>
            { showCash ? 
                <CashOnDelivery/> :
                <div className='form-section e-money'>
                    <Input 
                        label='e-Money Number'
                        placeholder='1234567890'
                        type='text'
                        register={register}
                    />
                    <Input 
                        label='e-Money PIN'
                        placeholder='1234'
                        type='text'
                        register={register}
                    />
            </div>
            }

            <PaymentCompleted 
                show={show}
                onClose={() => setShow(false)}
            />
        </form>
    );
}

export default Forms;