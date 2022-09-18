import mongoose from "mongoose";
import { Products } from "../types";
import {
    ImagesSchema,
    IncludesSchema,
    GallerySchema,
    RecommendedProductsSchema,
    ReviewSchema,
} from "./baseModels";

const Schema = mongoose.Schema;

const ProductSchema = new Schema<Products>({
    slug: String,
    name: String,
    image: ImagesSchema,
    category: {
        type: String,
        enum: ["earphones", "speakers", "headphones"],
    },
    categoryImage: ImagesSchema,
    new: Boolean,
    price: Number,
    description: String,
    features: String,
    includes: [IncludesSchema],
    gallery: GallerySchema,
    others: [RecommendedProductsSchema],
    reviews: [ReviewSchema],
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
