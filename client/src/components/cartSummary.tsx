import { useSelector } from 'react-redux';
import uniqid from 'uniqid'

import Button from './button';
import CartSummaryItemCounter from './CartSummaryItemCounter';
import './_styles/cartSummary.css';

import { RootState } from '../index';
import { CartItem } from '../types';
import helper from '../utils/helper';

const CartSummary = ({ defaultState }: {defaultState: 'hide' | 'show'}): JSX.Element => {
    const cartProducts = (useSelector((state: RootState) => state.cart));

    const getTotal = (): number => {
        let total: number = 0;
        cartProducts.forEach((cartProduct: CartItem) => {
            total += (+cartProduct.quantity * +cartProduct.price);
        });

        return total === NaN ? 0 : total;
    }

    return(
        <div className={`cart-summary ${defaultState}-cart-summary`}>
            <div>
                <h2>CART({ cartProducts.reduce((previous,next) => {
                    return { quantity: previous.quantity + next.quantity }
                }, { quantity: 0 }).quantity })</h2>
                <button>Remove all</button>
            </div>
            {cartProducts.map((cartProduct: CartItem, index: number) => {
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
            />
        </div>
    );
}

export default CartSummary;