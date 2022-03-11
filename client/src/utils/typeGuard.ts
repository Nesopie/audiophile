import { AxiosError } from "axios";

import { User } from '../types';

export const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError).config       !== undefined 
        && (error as AxiosError).request      !== undefined 
        && (error as AxiosError).response     !== undefined 
        && (error as AxiosError).isAxiosError !== undefined 
        && (error as AxiosError).toJSON       !== undefined;
}

const isUser = (user: unknown): user is User => {
    return (user as User).username !== undefined
        && (user as User).cart     !== undefined
        && (user as User).token    !== undefined;
}

export default { isAxiosError, isUser }