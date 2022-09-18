import express = require("express");
import { bodyValidator, controller, post } from "./decorators";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

@controller("/api/login")
class LoginController {
    @bodyValidator("username", "password")
    @post("/")
    async login(request: express.Request, response: express.Response) {
        const body = request.body;
        const user = await User.findOne({ username: body.username }).populate(
            "cart.product",
            { image: { mobile: 1 }, name: 1, price: 1 }
        );

        const passwordCorrect =
            user === null
                ? false
                : await bcrypt.compare(body.password, user.passwordHash);

        if (!user || !passwordCorrect) {
            response
                .status(401)
                .json({ error: "invalid username or password" });
            return;
        }

        const userForToken = {
            user: user.username,
            id: user._id,
            cart: user.cart,
        };

        const token = jwt.sign(userForToken, process.env.SECRET, {
            expiresIn: 60 * 60,
        });
        response.status(200).send({
            token,
            username: user.username,
            name: user.name,
            cart: user.cart,
        });
    }
}
