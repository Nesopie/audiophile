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
    others: Array<RecommendedProducts>,
    reviews: Array<Review>
}

export interface CartItem {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface IUser {
    username: string;
    name: string;
    passwordHash: string;
    cart: Array<CartItem>;
}

export interface Review {
    id: mongoose.Schema.Types.ObjectId;
    username: string,
    date: Date,
    content: string,
    upvotedBy: Array<mongoose.Schema.Types.ObjectId>;
    downvotedBy: Array<mongoose.Schema.Types.ObjectId>;
}