import { useSelector } from "react-redux";
import uniqid from "uniqid";
import React from "react";

import { RootState } from "../reducers/types";
import { CartItem } from "../types";
import helper from "../utils/helper";

import "./_styles/checkoutSummary.css";

const CheckoutSummary = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const cartProducts = useSelector((state: RootState) => state.cart);
    let { quantity }: { quantity: number } = cartProducts
        ? cartProducts.reduce(
              (previous, next) => {
                  return { quantity: previous.quantity + next.quantity };
              },
              { quantity: 0 }
          )
        : { quantity: 0 };

    return (
        <div className="checkout-summary">
            <div>
                <h2>CART({quantity})</h2>
                <button>Remove all</button>
            </div>
            {cartProducts?.map((cartProduct: CartItem, _index: number) => {
                return (
                    <div
                        className="checkout-products"
                        key={uniqid()}
                    >
                        <div>
                            <img src={require(`${cartProduct.imagePath}`)} />
                            <div>
                                <div>
                                    {helper.removeCategoryFromName(
                                        cartProduct.name
                                    )}
                                </div>
                                <div>$ {cartProduct.price}</div>
                            </div>
                        </div>
                        x {cartProduct.quantity}
                    </div>
                );
            })}
            <div className="checkout-meta">
                <div className="checkout-meta-item">
                    <div>TOTAL</div>
                    <div>$ {helper.getTotal(cartProducts)}</div>
                </div>
                <div className="checkout-meta-item">
                    <div>SHIPPING</div>
                    <div>$ 50</div>
                </div>
                <div className="checkout-meta-item">
                    <div>VAT (INCLUDED)</div>
                    <div>
                        $ {Math.round(0.2 * helper.getTotal(cartProducts))}
                    </div>
                </div>
                <div className="checkout-meta-item grand-total">
                    <div>GRAND TOTAL</div>
                    <div>
                        $ {Math.round(1.2 * helper.getTotal(cartProducts) + 50)}
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default CheckoutSummary;
