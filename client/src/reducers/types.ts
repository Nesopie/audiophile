import { CartItem, User } from "../types";

export type RootState = User;

export enum ActionType {
    setUser = "SET_USER",
    setCart = "SET_CART",
    setUserFromLocalStorage = "SET_USER_LS",
    resetUser = "RESET_USER",
    getState = "GET_STATE",
}

export interface ISetUserAction {
    type: ActionType.setUser;
    payload: User;
}

export interface ISetCartAction {
    type: ActionType.setCart;
    payload: Record<"cart", CartItem[]>;
}

export interface ISetUserFromLocalStorageAction {
    type: ActionType.setUserFromLocalStorage;
    payload: User;
}

export interface IGetState {
    type: ActionType.getState;
}

export interface IResetUserAction {
    type: ActionType.resetUser;
}
export type Action =
    | ISetUserAction
    | ISetCartAction
    | ISetUserFromLocalStorageAction
    | IResetUserAction
    | IGetState;
