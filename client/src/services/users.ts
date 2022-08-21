import axios from 'axios';
import { User } from '../types';
import helper from '../utils/helper';

const loginBaseUrl = 'http://localhost:3001/api/login';
const userBaseUrl = 'http://localhost:3001/api/users';

const getUserData = async (user: { username: string, password: string }): Promise<User> => {
    const response = await axios.post<User>(loginBaseUrl, user);
    return response.data;
}

const addCartItem = ( newProduct: any ) => {
    return async (dispatch: Function, getState: Function) => {
        const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { newCartProduct: newProduct },
        {
            headers: {
                'authorization': `bearer ${getState().token}`
            }
        });
        const result = helper.sanitizeCart(response.data);
        dispatch({ type: 'SET_CART', cart: result });
    }
}

const changeQuantity = (index: number, quantityChange: number): Function => {
    return async (dispatch: Function, getState: Function) => {
        const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { index, quantityChange },
        {
            headers: {
                'authorization': `bearer ${getState().token}`
            }
        });
        const result = helper.sanitizeCart(response.data);
        dispatch({ type: 'SET_CART', cart: result});
    }
}

const deleteCartItem = (index: number): Function => {
    return async (dispatch: Function, getState: Function) => {
        const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { index },
        {
            headers: {
                'authorization': `bearer ${getState().token}`
            }
        });

        const result = helper.sanitizeCart(response.data);
        dispatch({ type: 'SET_CART', cart: result });
    }
}

const deleteCart = (): Function => {
    return async (dispatch: Function, getState: Function) => {
        const response = await axios.patch(`${userBaseUrl}/${getState().username}`, { type: 'delete_all' },
        {
            headers: {
                'authorization': `bearer ${getState().token}`
            }
        });
        dispatch({ type: 'SET_CART', cart: []});
    }
}

export default { getUserData, addCartItem, changeQuantity, deleteCartItem, deleteCart };