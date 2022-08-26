import express = require('express');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

require('dotenv').config()
const app = express();
app.use(bodyParser.json());
const url = process.env.MONGODB_URI as string;

app.use(cors());

mongoose.connect(url)
    .then((_result: any) => {
        console.log('Connected to MONGODB');
    })
    .catch((error: unknown) => {
        if(error instanceof Error) 
            console.log('error connecting to MONGODB', error.message);
    });

app.use(express.static('build'));

app.use('/api/products', require(path.join(__dirname, 'routes', 'productRouter')));
app.use('/api/users', require(path.join(__dirname, 'routes', 'userRouter')));
app.use('/api/login', require(path.join(__dirname, 'routes', 'loginRouter')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));