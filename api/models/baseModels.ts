// These schemas are required to construct the other schemas
import mongoose from 'mongoose';
import { Images, Includes, Gallery, RecommendedProducts } from '../types';

const Schema = mongoose.Schema;

export const ImagesSchema: mongoose.Schema = new Schema<Images>(
    {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String }
    }
);

export const IncludesSchema: mongoose.Schema = new Schema<Includes>(
    {
        quantity: Number,
        item: String
    }
)

export const GallerySchema: mongoose.Schema = new Schema<Gallery>(
    {
        first: ImagesSchema,
        second: ImagesSchema,
        third: ImagesSchema
    }
);

export const RecommendedProductsSchema: mongoose.Schema = new Schema<RecommendedProducts>(
    {
        slug: String,
        name: String,
        images: ImagesSchema
    }
);