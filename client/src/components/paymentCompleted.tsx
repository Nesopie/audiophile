import { Modal } from '@mui/material';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '..';
import helper from '../utils/helper';
import Button from './button';

import './_styles/paymentCompleted.css';

interface IPaymentCompletedProps {
    show: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const PaymentCompleted = ({ show, onClose }: IPaymentCompletedProps) => {
    const cartProducts = (useSelector((state: RootState) => state.cart ));

    return (
        <Modal
            open={show}
            onClose={onClose}
            className='payment-completed-modal'
        >
            <div className="payment-completed">
                <AiOutlineCheckCircle 
                    size="64"
                    color={'#d87c4a'}
                />
                <h2>Thank you for your order</h2>
                <p>You will recieve an email confirmation shortly.</p>
                {cartProducts?.length > 0 && 
                <div>
                    <div className='checkout-products payment-completed-products'>
                        <div>
                            <div>
                                <img src={require(`${cartProducts[0]?.imagePath}`)} /> 
                                <div>
                                    <div>{helper.removeCategoryFromName(cartProducts[0]?.name)}</div>
                                    <div>$ {cartProducts[0]?.price}</div>
                                </div>
                            </div>
                            <div>x { cartProducts[0].quantity }</div>
                        </div>
                        { cartProducts.length > 1 && 
                            <div className="extra-items">
                                <hr/>
                                <span>and { cartProducts.length - 1} other item(s)</span>
                            </div>
                        }
                    </div>
                    <div className="grand-total">
                        <div>
                            <p>GRAND TOTAL</p>
                            <p>$ 5000</p>
                        </div>
                    </div>
                </div>}
                <Button 
                    buttonLabel='BACK TO HOME'
                    buttonColor='orange'
                />
            </div>
        </Modal>
    )
}

export default PaymentCompleted;