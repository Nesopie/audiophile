import { CartItem } from "../types";

const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Product = require('../models/products');

export const getAllUsers = async (_request: any, response: any) => {
    const users = await User.find({})
                            .populate('cart.product', { image: { mobile: 1}, price: 1, name: 1 });
    response.json(users);
}

export const getUser = async (request: any, response: any) => {
    const user = await User.findOne({ username: request.params.username })
                           .populate('cart.product', { image: { mobile: 1 }, price: 1, name: 1 });
    response.json(user);
}

export const postNewUser = async (request: any, response: any) => {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        cart: []
    });

    const savedUser = await user.save();

    response.json(savedUser);
}

export const updateCart = async (request: any, response: any) => {
    const body = request.body;
    const token = request.get('authorization').replace('bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!decodedToken.id)
        return response.status(401).json({ error: 'invalid or missing token '});

    const username = request.params.username;
    if(body.newCartProduct) {
        const user = await User.findOne({username: username}).populate('cart.product', { image: { mobile: 1 }, price: 1, name: 1 });
        if(user) {
            let oldCart: Array<CartItem> = [...user.cart];
            let newCart: Array<CartItem> = user.cart;

            let newCartProduct = await Product.find({ name: body.newCartProduct.name}, { name: 1, image: { mobile: 1}, price: 1, _id: 1} );
            let newCartProductId = newCartProduct[0]._id;

            console.log(newCartProduct);

            newCart.push({ product: newCartProductId, quantity: body.newCartProduct.quantity });
            user.cart = newCart;
            user.save().then((_savedUser: any) => {
                return response.json([...oldCart, { product: newCartProduct[0], quantity: body.newCartProduct.quantity }]);
            });
        }else {
            return response.status(401).json({ error: 'invalid username' });
        }
    }else if(body.quantityChange) {
        const user = await User.findOne({ username: username }).populate('cart.product', { image: { mobile: 1 }, price: 1, name: 1 });
        if(user) {
            const newCart: Array<CartItem> = user.cart;
            newCart[body.index].quantity = newCart[body.index].quantity + body.quantityChange;
            user.save().then((_savedUser: any) => {
                return response.json([...newCart]);
            });
        }
    }else if(body.index !== undefined) {
        const user = await User.findOne({ username: username }).populate('cart.product', { image: { mobile: 1 }, price: 1, name: 1 });
        if(user) {
            const newCart: Array<CartItem> = user.cart;
            newCart.splice(body.index, 1);
            user.save().then((_savedUser: any) => {
                return response.json([...newCart]);
            });
        }
    }
}