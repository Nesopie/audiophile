import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "..";
import { CartItem } from "../types";
import { Action, ActionType } from "../reducers/types";
import { Dispatch } from "redux";

const getCategoryFromSlug = (slug: string) => {
    let i;
    for (i = slug.length - 1; i >= 0; i--) {
        if (slug[i] === "-") break;
    }

    return slug.substring(i + 1, slug.length);
};

const getTotalPrice = (cartProducts: Array<CartItem>): number => {
    let total: number = 0;
    cartProducts.forEach((cartProduct: CartItem) => {
        total += +cartProduct.quantity * +cartProduct.price;
    });

    return total;
};

const removeCategoryFromName = (name: string): string => {
    if (name.includes("Headphones")) return name.replace("Headphones", "");
    if (name.includes("Earphones")) return name.replace("Earphones", "");
    if (name.includes("Speakers")) return name.replace("Speakers", "");
    return name;
};

const sanitizeCart = (cart: any): Array<CartItem> => {
    return cart.map((cartItem: any) => {
        return {
            imagePath: cartItem.product.image.mobile,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
            name: cartItem.product.name,
        };
    });
};

const OnLoadWrapper = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const dispatch = useDispatch<Dispatch<Action>>();
    useEffect(() => {
        if (store.getState()?.username) return;
        const userString = localStorage.getItem("user");
        if (!userString || userString === "") return;
        const user = JSON.parse(userString);
        dispatch({
            type: ActionType.setUserFromLocalStorage,
            payload: {
                username: user.username,
                token: user.token,
                cart: user.cart,
            },
        });
    }, []);

    return (
        <>
            {children}
            <Toaster
                position="bottom-right"
                reverseOrder={true}
                gutter={16}
                toastOptions={{
                    style: {
                        background: "#d87c4a",
                        color: "#fff",
                        minWidth: "300px",
                    },
                }}
            />
        </>
    );
};

const getTotal = (cartProducts: Array<CartItem>): number => {
    let total: number = 0;
    cartProducts?.forEach((cartProduct: CartItem) => {
        total += +cartProduct.quantity * +cartProduct.price;
    });

    return total === NaN ? 0 : total;
};

const helper = {
    getCategoryFromSlug,
    getTotalPrice,
    removeCategoryFromName,
    sanitizeCart,
    OnLoadWrapper,
    getTotal,
};

export default helper;
