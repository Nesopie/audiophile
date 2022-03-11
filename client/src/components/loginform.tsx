import { useDispatch } from 'react-redux';
import React from 'react';

import typeGuard from '../utils/typeGuard';
import Button from './button';
import Input from './input';

import { CartItem } from '../types';
import helper from '../utils/helper';
import userService from '../services/users';

const LoginForm = (): JSX.Element => {
    const dispatch = useDispatch();

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;  
        const username: HTMLInputElement | null = form.querySelector('#username');
        const password: HTMLInputElement | null = form.querySelector('#password');

        if(!username || username.value === "") {
            form.reset();
            return;
        }
        if(!password || password.value === "") {
            form.reset();
            return;
        }

        const user: {username: string, password: string} = { 
            username: username.value,
            password: password.value
        }

        try {
            const data: { token: string, username: string, cart: Array<CartItem> } = await userService.getUserData(user);
            dispatch({ type: 'SET_USER', username: data.username, cart: data.cart, token: data.token });
        }catch(error: unknown) {
            console.log(error);
            if(typeGuard.isAxiosError(error)) 
                if(error.response && error.response.status === 401)
                    console.log(error.response.data);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                label='username'
                placeholder='username'
                type="text"
            />
            <Input 
                label='password'
                placeholder='password'
                type="text"
            />
            <Button 
                type='submit'
                buttonColor='orange'
                buttonLabel='login'
            />
        </form>
    );
}

export default LoginForm;