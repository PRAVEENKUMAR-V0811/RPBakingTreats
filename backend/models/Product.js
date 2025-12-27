const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    cloudinary_id: { type: String, required: true }, // Needed for deletion
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);