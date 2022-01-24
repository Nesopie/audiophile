import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '..';

import './_styles/itemCounter.css';

const CartSummaryItemCounter = ({ index }: { index: number }): JSX.Element => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state: RootState) => state);

    const increment = () => {
        dispatch({type: 'CHANGE_QUANTITY', index, change: 1});
    }

    const decrement = () => {
        if(cartProducts[index].quantity === 1) {
            console.log('hi from delete');
            dispatch({type: 'DELETE', index});
        }else {
            dispatch({type: 'CHANGE_QUANTITY', index, change: -1});
        }
    }

    return (
        <div className="item-counter">
            <button onClick={decrement}>-</button>
            <div>{cartProducts[index] && cartProducts[index].quantity}</div>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default CartSummaryItemCounter;