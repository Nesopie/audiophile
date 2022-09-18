import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import typeGuard from "../utils/typeGuard";
import Button from "./button";
import Input from "./input";

import userService from "../services/users";
import { IFormValues } from "./forms";
import { useState } from "react";

const LoginForm = (): JSX.Element => {
    const { register } = useForm<IFormValues>();
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error !== null)
            setTimeout(() => {
                setError(null);
            }, 2000);
    }, [error]);

    const handleSubmit1 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const username: HTMLInputElement | null =
            form.querySelector("#Username");
        const password: HTMLInputElement | null =
            form.querySelector("#Password");

        if (!username || username.value === "") {
            form.reset();
            return;
        }

        if (!password || password.value === "") {
            form.reset();
            return;
        }

        const user: { username: string; password: string } = {
            username: username.value,
            password: password.value,
        };

        try {
            const data = await userService.getUserData(user);
            dispatch({
                type: "SET_USER",
                username: data.username,
                cart: data.cart,
                token: data.token,
            });
            window.location.href = "../";
        } catch (error: unknown) {
            if (typeGuard.isAxiosError(error))
                if (error.response && error.response.status === 401)
                    setError(error.response.data.error);
        }
    };

    //TODO check for already registered users in the backend
    const registerUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const form = document.querySelector(".login-form") as HTMLFormElement;
        const username = form.querySelector("#Username") as HTMLInputElement;
        const password = form.querySelector("#Password") as HTMLInputElement;

        if (!username || username.value === "") {
            form.reset();
            return;
        }
        if (!password || password.value === "") {
            form.reset();
            return;
        }

        const user: { username: string; password: string } = {
            username: username.value,
            password: password.value,
        };

        try {
            const data = await userService.registerUser(user);
            dispatch({
                type: "SET_USER",
                username: data.username,
                cart: data.cart,
                token: data.token,
            });
            window.location.href = "../";
        } catch (error: unknown) {
            if (typeGuard.isAxiosError(error)) {
                if (error.response && error.response.status === 401)
                    setError(error.response.data.error);
                if (error.response && error.response.status === 409)
                    setError(error.response.data.error);
            }
        }
    };

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit1}
        >
            <div>Sign in to your account</div>
            {error !== null && <div className="error">{error}</div>}
            <Input
                label="Username"
                placeholder="Username"
                type="text"
                register={register}
            />
            <Input
                label="Password"
                placeholder="Password"
                type="password"
                register={register}
            />
            <div className="button-container">
                <Button
                    type="submit"
                    buttonColor="orange"
                    buttonLabel="Login"
                />
                <Button
                    type="submit"
                    buttonColor="orange"
                    buttonLabel="Register"
                    handleClick={registerUser}
                />
            </div>
        </form>
    );
};

export default LoginForm;
