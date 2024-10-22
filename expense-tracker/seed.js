// seed.js
const db = require('./database');

// Sample data
const transactions = [
  { type: 'income', category: 'salary', amount: 5000, date: '2024-10-01', description: 'October Salary' },
  { type: 'expense', category: 'groceries', amount: 150, date: '2024-10-02', description: 'Groceries shopping' },
  { type: 'expense', category: 'rent', amount: 1000, date: '2024-10-03', description: 'October Rent' },
  { type: 'income', category: 'freelance', amount: 800, date: '2024-10-04', description: 'Freelance project payment' },
  { type: 'expense', category: 'utilities', amount: 200, date: '2024-10-05', description: 'Electricity bill' }
];

// Insert data into transactions table
db.serialize(() => {
  transactions.forEach(transaction => {
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
      [transaction.type, transaction.category, transaction.amount, transaction.date, transaction.description],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Inserted transaction with ID: ${this.lastID}`);
      });
  });
});

// Close the database connection when done
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});
