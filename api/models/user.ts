import mongoose from "mongoose";
import { CartItemSchema } from "./baseModels";
const uniqueValidator = require("mongoose-unique-validator");
import { IUser } from "../types";
const Schema = mongoose.Schema;

const userSchema: mongoose.Schema = new Schema({
    username: {
        type: String,
        minlength: 1,
        unique: true,
    },
    name: {
        type: String,
        minLength: 1,
    },
    passwordHash: {
        type: String,
        minLength: 8,
    },
    cart: [CartItemSchema],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);
module.exports = { User };
