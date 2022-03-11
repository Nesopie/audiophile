import mongoose from 'mongoose';

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
    id?: mongoose.Schema.Types.ObjectId | number;
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
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
}