const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    barcode: { type: String, unique: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    threshold: { type: Number, required: true },
    expiryDate: { type: Date }
},{
    timestamps:true
});

module.exports = mongoose.model('product', productSchema);
