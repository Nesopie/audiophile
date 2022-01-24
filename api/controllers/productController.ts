import { validateCategory } from "../utils";
const Product = require('../models/products');

exports.getAllProducts = (_req: any, res: any): void => {
    Product.find({}).exec((err: unknown, results: any) => {
        if(err && err instanceof Error)
            res.send(err.message);
        else 
            res.send(results);
    })
}

exports.getByCategory = (req: any, res: any): void => {
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
    try {
        Product.find({slug: req.params.slug}).exec((err: unknown, results: any) => {
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