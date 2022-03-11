import mongoose from 'mongoose';
import { Key } from 'react';

export interface Images {
    mobile: "string";
    tablet: "string";
    desktop: "string";
}

export type Category = "earphones" | "speakers" | "headphones";

export interface Includes {
    quantity: number;
    item: string;
}

export interface Gallery {
    first: Images;
    second?: Images;
    third?: Images;
}

export interface RecommendedProducts {
    slug: string;
    name: string;
    images: Images;
}

export interface Products {
    _id?: Key | null | undefined;
    slug: string;
    name: string;
    image: Images;
    category: Category;
    categoryImage: Images;
    new: boolean;
    price: number;
    description: string;
    features: string;
    includes: Array<Includes>
    gallery: Gallery;
    others: Array<RecommendedProducts>
}

export interface CartItem {
    imagePath: string;
    name: string;
    price: number;
    quantity: number;
}

export interface User {
    username: string;
    cart: Array<CartItem>;
    token: string | null;
}