import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '..';
import { ProductsContext } from './cartSummary';

import './_styles/itemCounter.css';

const CartSummaryItemCounter = ({ index }: { index: number }): JSX.Element => {
    const dispatch = useDispatch();
    const { cartProducts, setCartProducts } = useContext(ProductsContext);

    const increment = () => {
        dispatch({type: 'CHANGE_QUANTITY', index, change: 1});
        const newCart = cartProducts;
        newCart[index] = {...newCart[index], quantity: newCart[index].quantity + 1};
        setCartProducts(newCart);
    }

    const decrement = () => {
        if(cartProducts[index].quantity === 1) {
            dispatch({type: 'DELETE', index});
            let newCart = cartProducts;
            newCart.splice(index, 1);
            setCartProducts(newCart);
        }else {
            dispatch({type: 'CHANGE_QUANTITY', index, change: -1});
            const newCart = cartProducts;
            console.log(newCart);
            newCart[index] = {...newCart[index], quantity: newCart[index].quantity - 1};
            setCartProducts(newCart);
        }
    }

    return (
        <div className="item-counter">
            <button onClick={decrement}>-</button>
            <div>{cartProducts[index].quantity}</div>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default CartSummaryItemCounter;