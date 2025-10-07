const express = require('express');
const router = express.Router();

// Home route - Welcome message
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to our site",
        status: "success",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

// Alternative text response for browsers
router.get('/welcome', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Product Site</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; margin-top: 100px; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <h1>Welcome to our site</h1>
                <p>Backend server is running successfully!</p>
                <p><a href="/health">Check server health</a></p>
            </body>
        </html>
    `);
});

module.exports = router;
