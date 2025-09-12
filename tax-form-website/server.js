const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('form', { 
        error: null,
        income1: '',
        income2: ''
    });
});

app.post('/calculate', (req, res) => {
    const { income1, income2 } = req.body;
    
    // Validation
    const errors = [];
    
    if (!income1 || !income2) {
        errors.push('Both income fields are required');
    }
    
    const num1 = parseFloat(income1);
    const num2 = parseFloat(income2);
    
    if (isNaN(num1) || isNaN(num2)) {
        errors.push('Please enter valid numbers for income');
    }
    
    if (num1 < 0 || num2 < 0) {
        errors.push('Income values cannot be negative');
    }
    
    if (errors.length > 0) {
        return res.render('form', {
            error: errors.join(', '),
            income1: income1 || '',
            income2: income2 || ''
        });
    }
    
    // Calculate total income (server-side calculation)
    const totalIncome = num1 + num2;
    
    // Render result page
    res.render('result', {
        income1: num1.toFixed(2),
        income2: num2.toFixed(2),
        totalIncome: totalIncome.toFixed(2)
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Tax Form Website running on http://localhost:${PORT}`);
});
