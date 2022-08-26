import { validateCategory } from "../utils";
const { Product } = require('../models/products');
const { User } = require('../models/user');
import express = require('express');
import { Products, Review } from "../types";

exports.getAllProducts = (req: any, res: any): void => {
    Product.find({}).exec((err: unknown, results: any) => {
        if(err && err instanceof Error)
            res.send(err.message);
        else 
            res.send(results);
    })
}

exports.getByCategory = (req: any, res: any): void => {
    console.log(req);
    try {
        if(!validateCategory(req.params.category))
            throw new Error("Invalid category!");
        Product.find({category: req.params.category}).exec((err: unknown, results: any) => {
            if(err && err instanceof Error)
                res.send(err.message);
            else 
                res.send(results);
        });
    } catch(error: unknown) {
        if(error instanceof Error) 
            res.json({ error: error.message });
    }
}

exports.getBySlug = (req: any, res: any): void => {
    console.log(req);
    try {
        Product.find({slug: req.params.slug})
        .populate('reviews.upvotedBy').populate('reviews.downvotedBy')
        .exec((err: unknown, results: any) => {
            if(err && err instanceof Error)
                console.error(err.message);
            else 
                res.send(results);
        })
    } catch(error: unknown) {
        if(error instanceof Error) 
            res.json({ error: error.message })
    }
}

exports.addReview = async (req: express.Request, res: express.Response) => {
    let product = await Product.findOne({slug: req.params.slug}).populate('reviews.upvotedBy').populate('reviews.downvotedBy');
    let user = await User.findOne({username: req.body.review.username});

    req.body.review.upvotedBy = [user];
    product.reviews = [...product.reviews,req.body.review];

    product.save().then((savedProduct: Products) => {
        res.json(savedProduct.reviews);
    });
}

exports.handleUpvote = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(req.body.type === "upvote") {
        const product = await Product.findOne({'reviews': { $elemMatch: {_id: req.body.id }}})
                                     .populate('reviews.upvotedBy')
                                     .populate('reviews.downvotedBy');
        const user = await User.findOne({ username: req.body.username });
        delete user.passwordHash;
        delete user.__v;
        const review = product.reviews.filter((review: Review) => review.id === req.body.id)[0];
    
        let indexDownvoted = -1;
        let indexUpvoted = -1;

        for(let i = 0; i < review.downvotedBy.length; i++) {
            if(review.downvotedBy[i].equals(user._id)) {
                indexDownvoted = i;
                break;
            }
        }

        for(let i = 0; i < review.upvotedBy.length; i++) {
            if(review.upvotedBy[i].equals(user._id)) {
                indexUpvoted = i;
                break;
            }
        }

        if(indexDownvoted !== -1) 
            review.downvotedBy.splice(indexDownvoted, 1);

        if(indexUpvoted === -1)
            review.upvotedBy.push(user);
        else 
            review.upvotedBy.splice(indexUpvoted, 1);

        for(let i = 0; i < product.reviews.length; i++) {
            if(product.reviews[i]._id.equals(review._id)) {
                product.reviews[i] = review;
                break;
            }
        }

        product.save().then((savedProduct: Products) => {
            res.json(savedProduct.reviews);
        });

    }else {
        next();
    }
}

exports.handleDownvote = async (req: express.Request, res: express.Response) => {
    if(req.body.type === "downvote") {
        const product = await Product.findOne({'reviews': { $elemMatch: {_id: req.body.id }}})
                                     .populate('reviews.upvotedBy')
                                     .populate('reviews.downvotedBy');
        const user = await User.findOne({ username: req.body.username });
        delete user.passwordHash;
        delete user.__v;
        const review = product.reviews.filter((review: Review) => review.id === req.body.id)[0];
    
        let indexUpvoted = -1;
        let indexDownvoted = -1;
        for(let i = 0; i < review.upvotedBy.length; i++) {
            if(review.upvotedBy[i].equals(user._id)) {
                indexUpvoted = i;
                break;
            }
        }

        for(let i = 0; i < review.downvotedBy.length; i++) {
            if(review.downvotedBy[i].equals(user._id)) {
                indexDownvoted = i;
                break;
            }
        }

        if(indexUpvoted !== -1) 
            review.upvotedBy.splice(indexUpvoted, 1);

        if(indexDownvoted === -1)
            review.downvotedBy.push(user);
        else 
            review.downvotedBy.splice(indexDownvoted, 1);

        for(let i = 0; i < product.reviews.length; i++) {
            if(product.reviews[i]._id.equals(review._id))
                product.reviews[i] = review;
        }

        product.save().then((savedProduct: Products) => {
            res.json(savedProduct.reviews);
        });
    }
}