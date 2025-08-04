import dotenv from 'dotenv';
import express from 'express';
import { sql } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3001;

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("ok");
        
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

app.get('/', async (req, res) => {
    res.send('Get all transactions');
})

app.get('/api/transactions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/transactions', async (req, res) => {
    try {
        const { user_id, title, amount, category } = req.body;

        if (!user_id || !title || amount === undefined || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

        res.status(201).json(transaction[0]);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid transaction ID' });
        }

        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully'});
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

initDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
