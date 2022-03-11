import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid'
import { useEffect } from 'react';

import Button from './button';
import './_styles/checkoutSummary.css';

import { RootState } from '../index';
import { CartItem } from '../types';
import helper from '../utils/helper';

const CheckoutSummary = (): JSX.Element => {
    const cartProducts = (useSelector((state: RootState) => state.cart));
    const dispatch = useDispatch();
    let { quantity }: { quantity: number } = cartProducts.reduce((previous, next) => {
            return { quantity: previous.quantity + next.quantity };
        }, { quantity: 0});

    const getTotal = (): number => {
        let total: number = 0;
        cartProducts.forEach((cartProduct: CartItem) => {
            total += (+cartProduct.quantity * +cartProduct.price);
        });

        return total === NaN ? 0 : total;
    }

    useEffect(() => {
        dispatch({ type: 'SET_USER_LS' })
    }, []);

    return(
        <div className='checkout-summary'>
            <div>
                <h2>CART({quantity})</h2>
                <button>Remove all</button>
            </div>
            {cartProducts.map((cartProduct: CartItem, index: number) => {
                return (
                    <div className='checkout-products' key={uniqid()}>
                        <div>
                            <img src={require(`${cartProduct.imagePath}`)} /> 
                            <div>
                                <div>{helper.removeCategoryFromName(cartProduct.name)}</div>
                                <div>$ {cartProduct.price}</div>
                            </div>
                        </div>
                        x{ cartProduct.quantity }
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
            />
        </div>
    );
}

export default CheckoutSummary;