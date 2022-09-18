import { CartItem } from "../types";
import helper from "../utils/helper";
import CartSummaryItemCounter from "./CartSummaryItemCounter";
import React from "react";

const cartSummaryItem = ({
    cartProduct,
    index,
}: {
    cartProduct: CartItem;
    index: number;
}): JSX.Element => {
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

export default React.memo(cartSummaryItem);
