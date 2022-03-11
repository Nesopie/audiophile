
import { useDispatch } from 'react-redux';
import { store } from '..';
import { RecommendedProducts, CartItem, Products } from '../types';
import typeGuard from './typeGuard';

const getCategoryFromSlug = (slug: string) => {
    let i;
    for(i = slug.length - 1; i >= 0; i--) {
        if(slug[i] === '-') break;
    }

    return slug.substring(i + 1, slug.length);
}

const getTotalPrice = (cartProducts: Array<CartItem>): number => {
    let total: number = 0;
    cartProducts.forEach((cartProduct: CartItem) => {
        total += (+cartProduct.quantity * +cartProduct.price);
    });

    return total;
}

const removeCategoryFromName = (name: string): string => {
    if(name.includes("Headphones"))
        return name.replace("Headphones", "");
    if(name.includes("Earphones"))
        return name.replace("Earphones", "");
    if(name.includes("Speakers"))
        return name.replace("Speakers", "");
    return name;
}

const sanitizeCart = (cart: any): Array<CartItem> => {
    return cart.map((cartItem: any) => {
        return {
            imagePath: cartItem.product.image.mobile,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
            name: cartItem.product.name
        }
    });
}

const useUser = ():void => {
    const dispatch = useDispatch();
    if(store.getState().username !== "")
        return;
    let user = localStorage.getItem("user");
    if(!user)
        return;
    user = JSON.parse(user);
    if(typeGuard.isUser(user)) {
        dispatch({ 
            type: 'SET_USER_LS ',
            user: {
                username: user.username,
                token: user.token,
                cart: user.cart
            }});
    }
}

export default { getCategoryFromSlug, getTotalPrice, removeCategoryFromName, sanitizeCart, useUser }
