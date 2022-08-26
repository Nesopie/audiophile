const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import express = require('express');
const { User } = require('../models/user');

exports.login = async(request: express.Request, response: express.Response) => {
    const body = request.body;
    const user = await User.findOne({ username: body.username })
                            .populate('cart.product', { image: { mobile: 1}, name: 1, price: 1 });

    const passwordCorrect = user === null 
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    console.log(body);

    if(!user || !passwordCorrect) {
        response.status(401).json({ error: 'invalid username or password' });
        return;
    }

    const userForToken = {
        user: user.username,
        id: user._id,
        cart: user.cart
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });
    response.status(200).send({ token, username: user.username, name: user.name, cart: user.cart });
}