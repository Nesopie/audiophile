import axios from "axios";
import { User } from "../types";
import helper from "../utils/helper";
import toast from "react-hot-toast";
import { Dispatch } from "redux";

const loginBaseUrl = `${window.location.origin}/api/login`;
const userBaseUrl = `${window.location.origin}/api/users`;
// const loginBaseUrl = "http://localhost:3001/api/login";
// const userBaseUrl = "http://localhost:3001/api/users";

const getUserData = async (user: {
    username: string;
    password: string;
}): Promise<User> => {
    const response = await axios.post<User>(loginBaseUrl, user);
    return response.data;
};

const registerUser = async (user: {
    username: string;
    password: string;
}): Promise<User> => {
    const response = await axios.post<User>(userBaseUrl, user);
    if (response.status >= 400) return response.data;
    return await getUserData(user);
};

const addCartItem = (newProduct: any) => {
    return async (dispatch: Function, getState: Function) => {
        const toastId = toast.loading(
            "We are processing your request, please wait for a moment"
        );
        try {
            const response = await axios.patch(
                `${userBaseUrl}/${getState().username}`,
                { newCartProduct: newProduct },
                {
                    headers: {
                        authorization: `bearer ${getState().token}`,
                    },
                }
            );
            if (response.status === 401) throw new Error(response.data);
            const result = helper.sanitizeCart(response.data);
            dispatch({ type: "SET_CART", payload: { cart: result } });
            toast.success("Item added to cart!", { id: toastId });
        } catch (err: unknown) {
            if (err instanceof Error) dispatch({ type: "RESET_USER" });
            toast.error("Uh-oh! Something went wrong :(", { id: toastId });
        }
    };
};

const changeQuantity = (index: number, quantityChange: number): Function => {
    return async (dispatch: Dispatch, getState: Function) => {
        const toastId = toast.loading(
            "We are processing your request, please wait for a moment"
        );
        try {
            const response = await axios.patch(
                `${userBaseUrl}/${getState().username}`,
                { index, quantityChange },
                {
                    headers: {
                        authorization: `bearer ${getState().token}`,
                    },
                }
            );
            const result = helper.sanitizeCart(response.data);
            dispatch({ type: "SET_CART", payload: { cart: result } });
            toast.success("Quantity changed!", { id: toastId });
        } catch (err: unknown) {
            if (err instanceof Error) dispatch({ type: "RESET_USER" });
            toast.error("Uh-oh! Something went wrong :(", { id: toastId });
        }
    };
};

const deleteCartItem = (index: number): Function => {
    return async (dispatch: Function, getState: Function) => {
        const toastId = toast.loading(
            "We are processing your request, please wait for a moment"
        );
        try {
            const response = await axios.patch(
                `${userBaseUrl}/${getState().username}`,
                { index },
                {
                    headers: {
                        authorization: `bearer ${getState().token}`,
                    },
                }
            );

            const result = helper.sanitizeCart(response.data);
            dispatch({ type: "SET_CART", payload: { cart: result } });
            toast.success("Item removed from cart", { id: toastId });
        } catch (err: unknown) {
            if (err instanceof Error) dispatch({ type: "RESET_USER" });
            toast.error("Uh-oh! Something went wrong :(", { id: toastId });
        }
    };
};

const deleteCart = (): Function => {
    return async (dispatch: Function, getState: Function) => {
        const toastId = toast.loading(
            "We are processing your request, please wait for a moment"
        );
        try {
            const response = await axios.patch(
                `${userBaseUrl}/${getState().username}`,
                { type: "delete_all" },
                {
                    headers: {
                        authorization: `bearer ${getState().token}`,
                    },
                }
            );
            if (response.status === 401) throw new Error(response.data);
            dispatch({ type: "SET_CART", payload: { cart: [] } });
            toast.success("Your cart is now cleared", { id: toastId });
        } catch (err: unknown) {
            if (err instanceof Error) {
                dispatch({ type: "RESET_USER" });
            }
            toast.error("Uh-oh! Something went wrong :(", { id: toastId });
        }
    };
};

const userService = {
    getUserData,
    registerUser,
    addCartItem,
    changeQuantity,
    deleteCartItem,
    deleteCart,
};

export default userService;
