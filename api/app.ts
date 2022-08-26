import express = require('express');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

require('dotenv').config();
const app = express();
const url = process.env.MONGODB_URI as string;

app.use(bodyParser.json());
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client', 'build')));
    app.get('/*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}else {
    app.use(express.static(path.join(__dirname, '../client', 'build')));
    app.get('/*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}