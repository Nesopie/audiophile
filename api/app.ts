import express = require('express');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const cors = require('cors');

require('dotenv').config()
const app = express();
app.use(bodyParser.json());
const url: string = <string>process.env.MONGODB_URI;

app.use(cors());
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');

mongoose.connect(url)
    .then((_result: any) => {
        console.log('Connected to MONGODB');
    })
    .catch((error: unknown) => {
        if(error instanceof Error) 
        console.log('error connecting to MONGODB', error.message);
    });

app.use(express.static('build'));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdFVzZXIiLCJpZCI6IjYxZjNiMzcwY2Y0ZDhhOTY1N2ExZmI4ZSIsImNhcnQiOltdLCJpYXQiOjE2NDM0MjE4MjgsImV4cCI6MTY0MzQyNTQyOH0.Lp2QuJ76ncxzHl3Pk8ntmt9xjBEjPQ5EXMVyJqZhWkA