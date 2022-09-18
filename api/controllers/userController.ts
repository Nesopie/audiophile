import express = require("express");
import { CartItem } from "../types";
import { controller, get, patch, post, use } from "./decorators";
import { tokenValidator } from "./productController";
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Product } = require("../models/products");

@controller("/api/users")
class UserController {
    @get("/")
    async getAllUsers(_request: express.Request, response: express.Response) {
        const users = await User.find({}).populate("cart.product", {
            image: { mobile: 1 },
            price: 1,
            name: 1,
        });
        response.json(users);
    }

    @post("/")
    async postNewUser(request: express.Request, response: express.Response) {
        const body = request.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.username,
            passwordHash,
            cart: [],
        });

        try {
            const savedUser = await user.save();
            response.json(savedUser);
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.constructor.name === "ValidationError") {
                    response
                        .status(409)
                        .json({ error: "Username already exists" });
                }
            }
        }
    }

    @get("/:username")
    async getUser(request: express.Request, response: express.Response) {
        const user = await User.findOne({
            username: request.params.username,
        }).populate("cart.product", {
            image: { mobile: 1 },
            price: 1,
            name: 1,
        });
        if (user) response.json(user);
        else response.status(403).json({ error: "invalid username" });
    }

    @use(tokenValidator)
    @patch("/:username")
    async addNewProduct(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        if (request.body.newCartProduct) {
            const {
                params: { username },
                body,
            } = request;
            const user = await User.findOne({ username: username }).populate(
                "cart.product",
                { image: { mobile: 1 }, price: 1, name: 1 }
            );
            if (user) {
                let oldCart: Array<CartItem> = [...user.cart];
                let newCart: Array<CartItem> = user.cart;

                let newCartProduct = await Product.find(
                    { name: body.newCartProduct.name },
                    { name: 1, image: { mobile: 1 }, price: 1, _id: 1 }
                );
                let newCartProductId = newCartProduct[0]._id;

                newCart.push({
                    product: newCartProductId,
                    quantity: body.newCartProduct.quantity,
                });
                user.cart = newCart;
                user.save().then((_: any) => {
                    return response.json([
                        ...oldCart,
                        {
                            product: newCartProduct[0],
                            quantity: body.newCartProduct.quantity,
                        },
                    ]);
                });
            } else {
                return response.status(404).json({ error: "invalid username" });
            }
        } else {
            return next();
        }
    }

    @use(tokenValidator)
    @patch("/:username")
    async quantityChange(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        if (request.body.quantityChange) {
            const {
                params: { username },
                body,
            } = request;
            console.log(request.body);

            const user = await User.findOne({ username: username }).populate(
                "cart.product",
                { image: { mobile: 1 }, price: 1, name: 1 }
            );

            if (user) {
                const newCart: Array<CartItem> = user.cart;
                newCart[body.index].quantity =
                    newCart[body.index].quantity + body.quantityChange;
                console.log(newCart);
                user.save().then((_savedUser: any) => {
                    return response.json([...newCart]);
                });
            } else {
                return response.status(404).json({ error: "invalid username" });
            }
        } else {
            return next();
        }
    }

    @use(tokenValidator)
    @patch("/:username")
    async deleteItem(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        if (request.body.index !== undefined) {
            const {
                params: { username },
                body,
            } = request;
            const user = await User.findOne({ username: username }).populate(
                "cart.product",
                { image: { mobile: 1 }, price: 1, name: 1 }
            );
            if (user) {
                const newCart: Array<CartItem> = user.cart;
                newCart.splice(body.index, 1);
                user.save().then((_savedUser: any) => {
                    return response.json([...newCart]);
                });
            } else {
                return response.status(404).json({ error: "invalid username" });
            }
        } else {
            return next();
        }
    }

    @use(tokenValidator)
    @patch("/:username")
    async deleteCart(request: express.Request, response: express.Response) {
        if (request.body.type === "delete_all") {
            const {
                params: { username },
            } = request;
            const user = await User.findOne({ username: username });
            if (user) {
                user.cart = [];
                user.save().then((_savedUser: any) => {
                    return response.json([]);
                });
            } else {
                response.status(404).json({ error: "invalid username" });
            }
        }
    }
}
