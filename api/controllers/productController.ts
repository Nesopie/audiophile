import express = require("express");
import { controller, get, patch, post, use } from "./decorators";
import { validateCategory } from "../utils";
const { Product } = require("../models/products");
const { User } = require("../models/user");
import { Products, Review } from "../types";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

export const tokenValidator = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    const token = request.get("authorization")?.replace("bearer ", "");
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken.id) {
            return response
                .status(401)
                .json({ error: "invalid or missing token" });
        }

        console.log(decodedToken);
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err instanceof TokenExpiredError) {
                return response
                    .status(401)
                    .json({ error: "Your session has expired" });
            } else if (err instanceof JsonWebTokenError) {
                return response
                    .status(401)
                    .json({ error: "Your session has expired" });
            }
        }
    }
    console.log("toiekls");
    return next();
};

@controller("/api/products")
class ProductController {
    @get("/")
    getAllProducts(req: any, res: any): void {
        Product.find({}).exec((err: unknown, results: any) => {
            if (err && err instanceof Error) res.send(err.message);
            else res.send(results);
        });
    }

    @get("/:category")
    getByCategory(req: any, res: any): void {
        try {
            if (!validateCategory(req.params.category))
                throw new Error("Invalid category!");
            Product.find({ category: req.params.category }).exec(
                (err: unknown, results: any) => {
                    if (err && err instanceof Error) res.send(err.message);
                    else res.send(results);
                }
            );
        } catch (error: unknown) {
            if (error instanceof Error) res.json({ error: error.message });
        }
    }

    @get("/:category/:slug")
    getBySlug(req: any, res: any): void {
        try {
            Product.find({ slug: req.params.slug })
                .populate("reviews.upvotedBy")
                .populate("reviews.downvotedBy")
                .exec((err: unknown, results: any) => {
                    if (err && err instanceof Error) console.error(err.message);
                    else res.send(results);
                });
        } catch (error: unknown) {
            if (error instanceof Error) res.json({ error: error.message });
        }
    }

    @use(tokenValidator)
    @post("/:category/:slug")
    async addReview(req: express.Request, res: express.Response) {
        let product = await Product.findOne({ slug: req.params.slug })
            .populate("reviews.upvotedBy")
            .populate("reviews.downvotedBy");
        let user = await User.findOne({ username: req.body.review.username });

        req.body.review.upvotedBy = [user];
        product.reviews = [...product.reviews, req.body.review];

        product.save().then((savedProduct: Products) => {
            res.json(savedProduct.reviews);
        });
    }

    // @use(tokenValidator)
    @patch("/:category/:slug")
    async handleUpvote(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body.type === "upvote") {
            const product = await Product.findOne({
                reviews: { $elemMatch: { _id: req.body.id } },
            })
                .populate("reviews.upvotedBy")
                .populate("reviews.downvotedBy");
            const user = await User.findOne({ username: req.body.username });
            delete user.passwordHash;
            delete user.__v;
            const review = product.reviews.filter(
                (review: Review) => review.id === req.body.id
            )[0];

            let indexDownvoted = -1;
            let indexUpvoted = -1;

            for (let i = 0; i < review.downvotedBy.length; i++) {
                if (review.downvotedBy[i].equals(user._id)) {
                    indexDownvoted = i;
                    break;
                }
            }

            for (let i = 0; i < review.upvotedBy.length; i++) {
                if (review.upvotedBy[i].equals(user._id)) {
                    indexUpvoted = i;
                    break;
                }
            }

            if (indexDownvoted !== -1)
                review.downvotedBy.splice(indexDownvoted, 1);

            if (indexUpvoted === -1) review.upvotedBy.push(user);
            else review.upvotedBy.splice(indexUpvoted, 1);

            for (let i = 0; i < product.reviews.length; i++) {
                if (product.reviews[i]._id.equals(review._id)) {
                    product.reviews[i] = review;
                    break;
                }
            }

            product.save().then((savedProduct: Products) => {
                res.json(savedProduct.reviews);
            });
        } else {
            next();
        }
    }

    @patch("/:category/:slug")
    async handleDownvote(req: express.Request, res: express.Response) {
        if (req.body.type === "downvote") {
            const product = await Product.findOne({
                reviews: { $elemMatch: { _id: req.body.id } },
            })
                .populate("reviews.upvotedBy")
                .populate("reviews.downvotedBy");
            const user = await User.findOne({ username: req.body.username });
            delete user.passwordHash;
            delete user.__v;
            const review = product.reviews.filter(
                (review: Review) => review.id === req.body.id
            )[0];

            let indexUpvoted = -1;
            let indexDownvoted = -1;
            for (let i = 0; i < review.upvotedBy.length; i++) {
                if (review.upvotedBy[i].equals(user._id)) {
                    indexUpvoted = i;
                    break;
                }
            }

            for (let i = 0; i < review.downvotedBy.length; i++) {
                if (review.downvotedBy[i].equals(user._id)) {
                    indexDownvoted = i;
                    break;
                }
            }

            if (indexUpvoted !== -1) review.upvotedBy.splice(indexUpvoted, 1);

            if (indexDownvoted === -1) review.downvotedBy.push(user);
            else review.downvotedBy.splice(indexDownvoted, 1);

            for (let i = 0; i < product.reviews.length; i++) {
                if (product.reviews[i]._id.equals(review._id))
                    product.reviews[i] = review;
            }

            product.save().then((savedProduct: Products) => {
                res.json(savedProduct.reviews);
            });
        }
    }
}
