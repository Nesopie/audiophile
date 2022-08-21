// These schemas are required to construct the other schemas
import mongoose from 'mongoose';
import { Images, Includes, Gallery, RecommendedProducts, CartItem, Review } from '../types';

const Schema = mongoose.Schema;

export const ImagesSchema = new Schema<Images>(
    {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String }
    }
);

export const IncludesSchema = new Schema<Includes>(
    {
        quantity: Number,
        item: String
    }
)

export const GallerySchema = new Schema<Gallery>(
    {
        first: ImagesSchema,
        second: ImagesSchema,
        third: ImagesSchema
    }
);

export const RecommendedProductsSchema = new Schema<RecommendedProducts>(
    {
        slug: String,
        name: String,
        images: ImagesSchema
    }
);

export const CartItemSchema = new Schema<CartItem>(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }
);

export const ReviewSchema = new Schema<Review>(
    {
        username: String,
        content: String,
        date: Date,
        upvotedBy: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        },
        downvotedBy: {
            type: [ mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }
    }
)