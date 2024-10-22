// routes/transactions.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// Add a new transaction
router.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;

    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`, 
    [type, category, amount, date, description], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all transactions
router.get('/transactions', (req, res) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Get a transaction by ID
router.get('/transactions/:id', (req, res) => {
    const id = req.params.id;

    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(row);
    });
});

// Update a transaction by ID
router.put('/transactions/:id', (req, res) => {
    const id = req.params.id;
    const { type, category, amount, date, description } = req.body;

    db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [type, category, amount, date, description, id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'Transaction updated' });
    });
});

// Delete a transaction by ID
router.delete('/transactions/:id', (req, res) => {
    const id = req.params.id;

    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'Transaction deleted' });
    });
});

// Get transaction summary (total income, total expenses, balance)
router.get('/summary', (req, res) => {
    db.all(`SELECT type, SUM(amount) as total FROM transactions GROUP BY type`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const income = rows.find(row => row.type === 'income')?.total || 0;
        const expense = rows.find(row => row.type === 'expense')?.total || 0;

        res.status(200).json({
            totalIncome: income,
            totalExpense: expense,
            balance: income - expense
        });
    });
});

module.exports = router;
