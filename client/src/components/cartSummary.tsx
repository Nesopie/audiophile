import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import Modal from '@mui/material/Modal'

import { RootState } from '../index';
import Button from './button';
import CartSummaryItemCounter from './CartSummaryItemCounter';
import { CartItem } from '../types';
import userService from "../services/users";
import helper from '../utils/helper';

import './_styles/cartSummary.css';

const CartSummary = ({ defaultState, setShowCart }: { defaultState: boolean, setShowCart: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
    const dispatch = useDispatch();
    const cartProducts = (useSelector((state: RootState) => state.cart ));
    const getTotal = (): number => {
        let total: number = 0;
        cartProducts?.forEach((cartProduct: CartItem) => {
            total += (+cartProduct.quantity * +cartProduct.price);
        });
        return total === NaN ? 0 : total;
    }

    const removeAll = (_event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(userService.deleteCart());
    }

    return(
        <Modal
            open={defaultState}
            onClose={() => setShowCart((prev) => !prev)}
        >
            <div className={'cart-summary'}>
                <div>
                    <h2>CART({ cartProducts?.reduce((previous,next) => {
                        return { quantity: previous.quantity + next.quantity }
                    }, { quantity: 0 }).quantity })</h2>
                    <button onClick={removeAll}>Remove all</button>
                </div>
                {cartProducts?.map((cartProduct: CartItem, index: number) => {
                    return (
                        <div className='summary-products' key={uniqid()}>
                            <div>
                                <img src={require(`${cartProduct.imagePath}`)} /> 
                                <div>
                                    <div>{helper.removeCategoryFromName(cartProduct.name)}</div>
                                    <div>$ {cartProduct.price}</div>
                                </div>
                            </div>
                            <CartSummaryItemCounter
                                index={index}
                            />
                        </div>
                    )
                })}
                <div className="total">
                    <div>TOTAL</div>
                    <div>$ {getTotal()}</div>
                </div>
                <Button
                    buttonLabel="CHECKOUT"
                    buttonColor="orange"
                    handleClick={() => window.location.href = `${window.location.origin}/checkout`}
                />
            </div>
        </Modal>
    );
}

export default CartSummary;