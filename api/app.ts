import express = require("express");
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { AppRouter } from "./routes/AppRouter";

require("dotenv").config();

require(path.join(__dirname, "controllers", "userController"));
require(path.join(__dirname, "controllers", "loginController"));
require(path.join(__dirname, "controllers", "productController"));
// api/controllers/.ts

const app = express();
const url = process.env.MONGODB_URI as string;

app.use(bodyParser.json());
app.use(cors());

mongoose
    .connect(url)
    .then((_result: any) => {
        console.log("Connected to MONGODB");
    })
    .catch((error: unknown) => {
        if (error instanceof Error)
            console.log("error connecting to MONGODB", error.message);
    });

app.use(express.static("build"));
app.use(AppRouter.instance);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client", "build")));
    app.get("/*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
}
