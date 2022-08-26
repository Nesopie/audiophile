import axios from 'axios';
import { User } from '../types';
import helper from '../utils/helper';

const loginBaseUrl = `${window.location.origin}/api/login`
const userBaseUrl = `${window.location.origin}/api/users`

const getUserData = async (user: { username: string, password: string }): Promise<User> => {
    const response = await axios.post<User>(loginBaseUrl, user);
    return response.data;
}

const registerUser = async (user: { username: string, password: string}): Promise<User> => {
    const response = await axios.post<User>(userBaseUrl, user);
    if(response.status >= 400) 
        return response.data;
    return await getUserData(user);
}

const addCartItem = ( newProduct: any ) => {
    return async (dispatch: Function, getState: Function) => {
        try {
            const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { newCartProduct: newProduct },
            {
                headers: {
                    'authorization': `bearer ${getState().token}`
                }
            });
            if(response.status === 401) throw new Error(response.data);
            const result = helper.sanitizeCart(response.data);
            dispatch({ type: 'SET_CART', cart: result });
        }catch(err: unknown) {
            if(err instanceof Error) {
                window.location.href = `${window.location.origin}/login`;
                dispatch({ type: 'RESET_USER' });
            }
        }
    }
}

const changeQuantity = (index: number, quantityChange: number): Function => {
    return async (dispatch: Function, getState: Function) => {
        try {
            const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { index, quantityChange },
            {
                headers: {
                    'authorization': `bearer ${getState().token}`
                }
            });
            const result = helper.sanitizeCart(response.data);
            dispatch({ type: 'SET_CART', cart: result});
        }catch(err: unknown) {
            if(err instanceof Error) {
                window.location.href = `${window.location.origin}/login`;
                dispatch({ type: 'RESET_USER' });
            }
        }
    }
}

const deleteCartItem = (index: number): Function => {
    return async (dispatch: Function, getState: Function) => {
        try {
            const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { index },
            {
                headers: {
                    'authorization': `bearer ${getState().token}`
                }
            });
    
            const result = helper.sanitizeCart(response.data);
            dispatch({ type: 'SET_CART', cart: result });
        }catch(err: unknown) {
            if(err instanceof Error) {
                window.location.href = `${window.location.origin}/login`;
                dispatch({ type: 'RESET_USER' });
            }
        }
        
    }
}

const deleteCart = (): Function => {
    return async (dispatch: Function, getState: Function) => {
        try {
            const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { type: 'delete_all' },
            {
                headers: {
                    'authorization': `bearer ${getState().token}`
                }
            });
            if(response.status === 401) throw new Error(response.data);
            dispatch({ type: 'SET_CART', cart: []});
        }catch(err: unknown) {
            if(err instanceof Error) {
                window.location.href = `${window.location.origin}/login`;
                dispatch({ type: 'RESET_USER' });
            }
        }
    }
}

const userService = { getUserData, registerUser, addCartItem, changeQuantity, deleteCartItem, deleteCart };

export default userService;