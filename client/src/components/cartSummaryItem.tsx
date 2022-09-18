import { CartItem } from "../types";
import helper from "../utils/helper";
import CartSummaryItemCounter from "./CartSummaryItemCounter";
import React from "react";

export interface ICartSummaryItemProps {
    cartProduct: CartItem;
    index: number;
}

const cartSummaryItem = ({
    cartProduct,
    index,
}: ICartSummaryItemProps): JSX.Element => {
    console.log("hi");
    return (
        <div className="summary-products">
            <div>
                <img src={require(`${cartProduct.imagePath}`)} />
                <div>
                    <div>{helper.removeCategoryFromName(cartProduct.name)}</div>
                    <div>$ {cartProduct.price}</div>
                </div>
            </div>
            <CartSummaryItemCounter
                index={index}
                cartProduct={cartProduct}
            />
        </div>
    );
};

export default React.memo(
    cartSummaryItem,
    <T extends Readonly<ICartSummaryItemProps>>(prev: T, next: T) => {
        return (
            prev &&
            next &&
            prev.cartProduct.quantity === next.cartProduct.quantity
        );
    }
);
