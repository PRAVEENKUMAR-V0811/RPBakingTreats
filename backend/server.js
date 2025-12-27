const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Custom Modules
const { upload, cloudinary } = require('./config/cloudinary');
const Review = require('./models/Review');
const Product = require('./models/Product');

const app = express();

// Middleware
app.use(express.json());

// Enhanced CORS
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// --- REVIEW ROUTES ---

app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json([]);
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        if (!name || !rating || !comment) return res.status(400).json({ message: "All fields required" });
        const newReview = new Review({ name, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: "Failed to save review" });
    }
});

// --- PRODUCT CRUD ROUTES (Admin) ---

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ date: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// Create product (With Cloudinary Image)
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            desc: req.body.desc,
            image: req.file.path, // Cloudinary URL
            cloudinary_id: req.file.filename // Cloudinary ID
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: "Error creating product" });
    }
});

// Update product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        // If a new image is being uploaded
        if (req.file) {
            const product = await Product.findById(req.params.id);
            // Delete old image from Cloudinary
            await cloudinary.uploader.destroy(product.cloudinary_id);
            // Add new image details
            updateData.image = req.file.path;
            updateData.cloudinary_id = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });

        // Remove from Cloudinary first
        await cloudinary.uploader.destroy(product.cloudinary_id);
        // Remove from MongoDB
        await Product.findByIdAndDelete(req.params.id);
        
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

// Health Check
app.get('/', (req, res) => res.send("Bakery API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));