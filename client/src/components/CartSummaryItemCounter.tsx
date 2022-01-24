import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '..';

import './_styles/itemCounter.css';

const CartSummaryItemCounter = ({ index }: { index: number }): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <div className="item-counter">
            <button onClick={() => dispatch({type: 'CHANGE_QUANTITY', index, change: -1})}>-</button>
            <div>{useSelector((state: RootState) => state[index].quantity)}</div>
            <button onClick={() => dispatch({type: 'CHANGE_QUANTITY', index, change: 1})}>+</button>
        </div>
    );
}

export default CartSummaryItemCounter;