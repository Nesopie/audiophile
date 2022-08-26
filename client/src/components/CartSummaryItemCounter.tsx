import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';

import './_styles/itemCounter.css';

import userService from '../services/users';

const CartSummaryItemCounter = ({ index }: { index: number }): JSX.Element => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state: RootState) => state.cart);

    const increment = () => {
        dispatch(userService.changeQuantity(index, 1));
    }

    const decrement = () => {
        if(cartProducts[index].quantity === 1) {
            dispatch(userService.deleteCartItem(index));
        }else {
            dispatch(userService.changeQuantity(index, -1));
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