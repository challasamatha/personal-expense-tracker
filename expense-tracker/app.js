const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const transactionRoutes = require('./routes/transactions');
const app = express();

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Use the routes
app.use('/api', transactionRoutes);

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});