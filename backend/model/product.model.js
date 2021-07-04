const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    }
},
{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;