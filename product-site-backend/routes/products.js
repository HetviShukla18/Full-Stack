const express = require('express');
const router = express.Router();

// Sample product data (in a real app, this would come from a database)
const sampleProducts = [
    {
        id: 1,
        name: "Premium Headphones",
        price: 299.99,
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "Electronics",
        description: "Feature-rich smartwatch with health monitoring"
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        category: "Accessories",
        description: "Ergonomic aluminum laptop stand"
    }
];

// GET all products
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: sampleProducts,
        count: sampleProducts.length,
        timestamp: new Date().toISOString()
    });
});

// GET single product by ID
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = sampleProducts.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found',
            timestamp: new Date().toISOString()
        });
    }
    
    res.json({
        success: true,
        data: product,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
