import toast from "react-hot-toast";

import { User } from "../types";
import helper from "../utils/helper";
import { Action } from "./types";

export const userReducer = (
    state: User = { username: "", cart: [], token: null },
    action: Action
): User => {
    let newState: User = { username: "", cart: [], token: null };
    switch (action.type) {
        case "SET_USER":
            newState.username = action.payload.username;
            newState.cart = helper.sanitizeCart(action.payload.cart);
            newState.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(newState));
            console.log(newState);
            return { ...newState };
        case "SET_CART":
            newState = { ...state };
            if (state.username === "" || !state.username) return state;
            newState.cart = action.payload.cart;
            localStorage.setItem("user", JSON.stringify(newState));
            return { ...newState };
        case "SET_USER_LS":
            newState = action.payload;
            return { ...newState };
        case "GET_STATE":
            console.trace();
            return state;
        case "RESET_USER":
            toast.error("Your session has expired, please login again");
            const resetUser = { username: "", cart: [], token: null };
            localStorage.setItem("user", JSON.stringify(resetUser));
            return resetUser;
        default:
            return state;
    }
};
