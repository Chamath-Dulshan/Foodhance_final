const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongo db connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connected");
});

//db connection
// mongoose.connect(
//     uri,
//     {useNewUrlParser: true}
// )
//     .then(() => console.log('DB Connected'));

// routes
const productRoute = require('./routes/product');

// extensions
app.use('/products', productRoute);

// listening to port 5000
app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});