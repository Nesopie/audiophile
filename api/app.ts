import express = require('express');
import mongoose from 'mongoose';
const cors = require('cors');

require('dotenv').config()
const app = express();
const url: string = <string>process.env.MONGODB_URI;

app.use(cors());
const productRouter = require('./routes/productRouter');

mongoose.connect(url)
.then((_result: any) => {
    console.log('Connected to MONGODB');
})
.catch((error: unknown) => {
    if(error instanceof Error) 
    console.log('error connecting to MONGODB', error.message);
});

app.use('/api/products', productRouter);
app.use(express.static('build'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));