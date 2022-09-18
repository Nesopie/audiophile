import { useDispatch } from "react-redux";

import "./_styles/itemCounter.css";

import userService from "../services/users";
import React from "react";
import { CartItem } from "../types";

const CartSummaryItemCounter = ({
    index,
    cartProduct,
}: {
    index: number;
    cartProduct: CartItem;
}): JSX.Element => {
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(userService.changeQuantity(index, 1));
    };

    const decrement = () => {
        if (cartProduct.quantity === 1) {
            dispatch(userService.deleteCartItem(index));
        } else {
            dispatch(userService.changeQuantity(index, -1));
        }
    };

    return (
        <div className="item-counter">
            <button onClick={decrement}>-</button>
            <div>{cartProduct && cartProduct.quantity}</div>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default React.memo(CartSummaryItemCounter);
